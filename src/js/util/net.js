/**
 * Created by gmyth on 16/10/8.
 */
/**
 * Created with JetBrains PhpStorm.
 * User: layenlin
 * Date: 13-12-19
 * Time: 下午7:04
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports) {
    /** @module util/net */
    var $            = require('lib/jquery');
    var security     = require('util/security');

    /**
     * 初始化全局配置
     * @param {Object} options 参数信息，参考$.ajaxSettings，下面只列出新增的参数
     * @param {Object<string>} options.plugins 插件信息
     * @param {boolean} reset 是否重置配置，默认为叠加覆盖
     */
    exports.init = function(options, reset) {
        if (reset) {
            $.ajaxSettings = options;
        } else {
            $.ajaxSettings = $.extend(true, $.ajaxSettings, options);
        }
    };
    /**
     * ajax
     * @param {Object} options 参数信息，参考$.ajax，下面只列出新增的参数
     * @param {Object<string>} options.plugins 插件信息
     * @return {Object} xhr
     */
    exports.ajax = function( options ) {
        var deferred = $.Deferred && $.Deferred()
        var plugins = $.extend(true, {}, options.plugins, $.ajaxSettings.plugins);
        if (plugins) {
            // 初始化context - Begin
            var context = options.context || $.ajaxSettings.context;
            // 事件是绑定在context上的，context不能为空，否则会绑到在全局事件上，影响到所有的请求
            if (!context) {
                context = options.context = $(window.document.createElement('span'));
            } else if (!(context instanceof $)) {
                context = options.context = $(context);
            }
            // 初始化context - End

            // 重建xhr - Begin
            var pluginXhr;
            var methodList = ['abort', 'getAllResponseHeaders', 'getResponseHeader', 'open', 'overrideMimeType', 'send', 'setRequestHeader', 'init', 'openRequest', 'sendAsBinary'];
            var requestList = ['withCredentials'];
            var responseList = ['readyState', 'response', 'responseText', 'responseType', 'responseXML', 'status', 'statusText'];
            var eventList = ['abort', 'error', 'load', 'loadend', 'loadstart', 'progress', 'progress', 'timeout', 'readystatechange'];
            options.xhr = (function(xhr) {
                var proxyXhr = function () {};
                for (var i = 0, iMax = methodList.length; i < iMax; i++) {
                    if (typeof(xhr[methodList[i]]) !== 'undefined') {
                        proxyXhr.prototype[methodList[i]] = (function(method) {
                            return function() {
                                if (method && method.apply) {
                                    return method.apply(xhr, Array.prototype.slice.call(arguments, 0));
                                }
                            };
                        })(xhr[methodList[i]]);
                    }
                }
                proxyXhr.prototype.open = function() {
                    for (var i = 0, iMax = eventList.length; i < iMax; i ++) {
                        (function(event){
                            xhr[event] = function() {
                                if (typeof(pluginXhr[event]) === 'function') {
                                    for (var j = 0, jMax = responseList.length; j < jMax; j++) {
                                        try {
                                            if (typeof(xhr[responseList[j]]) !== 'undefined') {
                                                pluginXhr[responseList[j]] = xhr[responseList[j]];
                                            }
                                        } catch (e) { }
                                    }
                                    return pluginXhr[event].apply(pluginXhr, Array.prototype.slice.call(arguments, 0));
                                }
                            };
                        })('on' + eventList[i]);
                    }
                    return xhr.open.apply(xhr, Array.prototype.slice.call(arguments, 0));
                };
                proxyXhr.prototype.send = function() {
                    for (var i = 0, iMax = requestList.length; i < iMax; i ++) {
                        if (typeof(pluginXhr[requestList[i]]) !== 'undefined') {
                            xhr[requestList[i]] = pluginXhr[requestList[i]];
                        }
                    }
                    return xhr.send.apply(xhr, Array.prototype.slice.call(arguments, 0));
                };
                pluginXhr = new proxyXhr();
                if (deferred) deferred.promise(pluginXhr);
                return function() {
                    return pluginXhr;
                };
            })((options.xhr || $.ajaxSettings.xhr)());
            // 重建xhr - End

            // 加载插件 - Begin
            var nameList = [];
            for (var name in plugins) {
                if (plugins.hasOwnProperty(name)) {
                    nameList.push(name);
                }
            }
            //所有请求默认加上gtk
            nameList.push('util/security');

            context.on('ajaxSuccess', function(e, xhr, settings, data) {
                deferred.resolveWith(this, [data, 'success', xhr]);
            });
            context.on('ajaxError', function(e, xhr, settings, errorOrType) {
                deferred.rejectWith(this, [xhr, errorOrType, errorOrType]);
            });

            require.async(nameList, function() {
                for (var i = 0, iMax = nameList.length, pluginHandlers; i < iMax; i ++) {
                    // 获取事件集合
                    pluginHandlers = arguments[i]['getPluginHandlers'].call(arguments[i], plugins[nameList[i]]);
                    for (var eventName in pluginHandlers) {
                        if (pluginHandlers.hasOwnProperty(eventName)) {
                            // 注册事件
                            context.on(eventName, pluginHandlers[eventName]);
                        }
                    }
                }
                //todo global and jsonp
                $(context).trigger($.Event('ajaxStart'), [pluginXhr, options]);
                $.ajax(options);
            });
            // 加载插件 -End
            return pluginXhr;
        } else {
            return $.ajax(options);
        }
    };

    /**
     * GET请求获取数据
     * @param {string} url url
     * @param {object} data data
     * @param {function} success 成功回调函数
     * @param {string} dataType 数据类型
     * @param {object} options 参数信息，参考$.ajax，下面只列出新增的参数
     * @param {object<moduleName>} options.plugins 插件信息
     * @return {object} xhr
     * @return {xhr}
     */
    exports.get = function(url, data, success, dataType, options) {
        var settings = {};
        if (typeof(data) === 'function') {
            settings = {
                url: url,
                success: data,
                dataType: success
            };
        } else {
            settings = {
                url: url,
                data: data,
                success: success,
                dataType: dataType
            };
        }
        return this.ajax($.extend(true, settings, options));
    };

    /**
     * POST请求获取数据
     * @param {string} url url
     * @param {object} data data
     * @param {function} success 成功回调函数
     * @param {string} dataType 数据类型
     * @param {object} options 参数信息，参考$.ajax，下面只列出新增的参数
     * @param {object<moduleName>} options.plugins 插件信息
     * @return {object} xhr
     * @return {xhr}
     */
    exports.post = function(url, data, success, dataType, options) {
        return this.get(url, data, success, dataType, $.extend(true, {type: 'POST'}, options));
    };

    /**
     * GET请求获取JSON数据
     * @param {string} url url
     * @param {object} data data
     * @param {function} success 成功回调函数
     * @param {string} dataType 数据类型
     * @param {object} options 参数信息，参考$.ajax，下面只列出新增的参数
     * @param {object<moduleName>} options.plugins 插件信息
     * @return {object} xhr
     * @return {xhr}
     */
    exports.getJSON = function(url, data, success, options) {
        return this.get(url, data, success, 'json', options);
    };

    /**
     * 请求载入并执行一个 JavaScript 文件
     * @param {string} src js文件的url
     * @param {function} [callback] 成功回调函数
     */
    exports.getScript = function (url, callback, errCallback, charset) {
        var script = document.createElement('script');
        script.async = 'async';
        script.charset = charset||"utf-8";
        script.src = url;
        script.onload = callback || function () { };
        script.onerror = errCallback || function() {};
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    /**
     *	getCss
     *	请求并且加载一个css
     *
     */
    exports.getCss  = function (url, callback, errCallback) {
        var script    = document.createElement('link');
        script.async  = 'async';
        script.rel    = "stylesheet";
        script.type   = "text/css";
        script.href   = url;
        script.onload = callback || function () { };
        script.onerror= errCallback || function() {};
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    /**
     *	getTpl
     *	请求加载一个html模板
     *	发送一个xhr请求。 但是这个要求模板文件，和页面文件同域。否则会有问题
     */
    exports.getTpl = function (url, callback, errCallback){
        var xhr = new XMLHttpRequest();
        xhr.open( "get" , url , true );
        xhr.onreadystatechange  =function(){
            if (xhr.readyState==4 && xhr.status==200){
                callback && callback( xhr.responseText );
            }else if( xhr.readyState == 4 && xhr.status != 200 ){
                errCallback && errCallback( xhr.responseText );
            }
        }
        xhr.send();
        return xhr;
    };

    /**
     * 请求一个url但不理会响应
     * @param {string} url url
     */
    exports.ping = function(url) {
        var cache = arguments.callee;
        var name = 'ping_' + (cache.priority = (parseInt(cache.priority) || 0) + 1);
        var ping = window[name] = new Image();
        ping.src = url;
        ping.onerror = ping.onload = function() {
            ping.onerror = ping.onload = null;
            ping = null;
            delete window[name];
        };
    };
});
