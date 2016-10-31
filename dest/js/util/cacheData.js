/**
 * Created with JetBrains PhpStorm.
 * User: layenlin
 * Date: 13-12-16
 * Time: 上午10:39
 * To change this template use File | Settings | File Templates.
 */
define("util/cacheData", [], function(require, exports, module) {
    var _private = {};
    _private.sn = "gamecenter_";
    _private.getName = function(name, category, type) {
        return "gamecenter_&" + escape(category || "normal") + "&" + escape(name) + (type ? "&" + escape(type) : "");
    };
    _private.getLocalStorage = function(name, category) {
        try {
            var value = window.localStorage.getItem(_private.getName(name, category));
            var info = JSON.parse(window.localStorage.getItem(_private.getName(name, category, "info")));
            value = JSON.parse(value);
        } catch (e) {
            return null;
        }
        try {
            window.localStorage.setItem(_private.getName(name, category, "info"), JSON.stringify({
                time: info && parseInt(info.time) || new Date().getTime(),
                count: (info && parseInt(info.count) || 0) + 1
            }));
        } catch (e) {
            // 设置出错，清除ls
            window.localStorage.clear();
            return null;
        }
        return value;
    };
    var seed = 0;
    _private.setLocalStorage = function(name, value, category) {
        seed++;
        console.time("setls_" + seed);
        var json = JSON.stringify(value);
        try {
            window.localStorage.setItem(_private.getName(name, category), json);
            window.localStorage.setItem(_private.getName(name, category, "info"), JSON.stringify({
                time: new Date().getTime(),
                count: 0
            }));
        } catch (e) {
            window.localStorage.clear();
            return false;
        }
        console.timeEnd("setls_" + seed);
        return true;
    };
    _private.getLocalStorageTime = function(name, category) {
        try {
            var info = JSON.parse(window.localStorage.getItem(_private.getName(name, category, "info")));
            return info && parseInt(info.time) || 0;
        } catch (e) {
            return 0;
        }
    };
    _private.getLocalStorageCount = function(name, category) {
        try {
            var info = JSON.parse(window.localStorage.getItem(_private.getName(name, category, "info")));
            return info && parseInt(info.count) || 0;
        } catch (e) {
            return 0;
        }
    };
    _private.memoryCache = {};
    _private.getMemory = function(name, category) {
        var data = _private.memoryCache[_private.getName(name, category)];
        var value = data && data.value;
        var time = data && data.time;
        var count = data && data.count;
        //store.log('store.cacheData getMemory: value[' + value + '] name[' + name + '] category[' + category + '] time[' + time + '] count[' + count + ']');
        if (typeof data === "undefined") {
            return null;
        } else {
            if (data !== null) {
                data.count = (parseInt(data.count) || 0) + 1;
            }
            return value;
        }
    };
    _private.setMemory = function(name, value, category) {
        //store.log('store.cacheData setMemory: value[' + JSON.stringify(value) + '] name[' + name + '] category[' + category + ']');
        _private.memoryCache[_private.getName(name, category)] = {
            value: value,
            time: new Date().getTime(),
            count: 0
        };
        return true;
    };
    _private.getMemoryTime = function(name, category) {
        var data = _private.memoryCache[_private.getName(name, category)];
        return data && parseInt(data.time) || 0;
    };
    _private.getMemoryCount = function(name, category) {
        var data = _private.memoryCache[_private.getName(name, category)];
        return data && parseInt(data.count) || 0;
    };
    exports.get = function(name) {
        var category = "";
        switch (this.getCacheMode()) {
          case "localStorage":
            return _private.getLocalStorage.call(this, name, category);

          case "memory":
            return _private.getMemory.call(this, name, category);
        }
    };
    exports.set = function(name, value) {
        var category = "";
        switch (this.getCacheMode()) {
          case "localStorage":
            return _private.setLocalStorage.call(this, name, value, category);

          case "memory":
            return _private.setMemory.call(this, name, value, category);
        }
    };
    _private.cacheMode = null;
    exports.setCacheMode = function(mode) {
        _private.cacheMode = mode;
    };
    exports.getCacheMode = function() {
        if (_private.cacheMode === null) {
            if (window.localStorage) {
                _private.cacheMode = "localStorage";
            } else {
                _private.cacheMode = "memory";
            }
        }
        return _private.cacheMode;
    };
    exports.isExpire = function(name, maxSecond, maxCount) {
        var time = 0;
        var count = 0;
        var category = "";
        switch (this.getCacheMode()) {
          case "localStorage":
            time = _private.getLocalStorageTime.call(this, name, category);
            count = _private.getLocalStorageCount.call(this, name, category);
            break;

          case "memory":
            time = _private.getLocalStorageTime.call(this, name, category);
            count = _private.getLocalStorageCount.call(this, name, category);
            break;
        }
        if (Math.abs(new Date().getTime() - time) > maxSecond * 1e3) {
            //store.log('store.dataCache isExpire: true name[' + name + '] category[' + category + '] maxSecond[' + maxSecond + '] time[' + time + '] now[' + new Date().getTime() + ']');
            return true;
        }
        if (count > maxCount) {
            //store.log('store.dataCache isExpire: true name[' + name + '] category[' + category + '] maxCount[' + maxCount + '] count[' + count + ']');
            return true;
        }
        //store.log('store.dataCache isExpire: false name[' + name + '] category[' + category + '] maxSecond[' + maxSecond + '] maxCount[' + maxCount + '] time[' + time + '] now[' + new Date().getTime() + '] count[' + count + ']');
        return false;
    };
});
