define("util/util", [], function(require, exports, module) {
    var util = {
        globalError: function(msg) {
            var $wrap = $("<div></div>");
            $wrap.css({
                position: "fixed",
                top: "50%",
                left: "10%",
                marginTop: "-50px",
                width: "80%",
                height: "100px",
                textAlign: "center",
                fontSize: "24px"
            });
            $wrap.text(msg);
            $wrap.appendTo($(document.body).html(""));
        },
        /**
         * 判断当前页面是否被嵌套
         * @returns {boolean}
         */
        isEmbed: function() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        },
        /**
         * 合并对象(深层对比,但默认不超过20层,避免有循环引用)
         * 不处理原型中的属性
         *
         * @param {Object} o 目标对象
         * @param {Object} append 要合并的对象
         * @param {Number} deep (optional) 默认最大20层
         * @return {Object} merged
         */
        /*merge : function (o, append, deep */
        /* = 20 */
        /*) {
         var dest, src, n,
         ret = {};
         deep = parseInt(deep, 10);
         if (window.isNaN(deep)) {
         deep = 20;
         }
         // 尝试深度超过，退出。
         if (deep <= 0) {
         //warn("对象深度超出!可能存在循环引用");
         return null;
         }
         // 先复制自身属性到新对象
         for(n in o){
         if(o.hasOwnProperty(n)){
         ret[n] = o[n];
         }
         }
         // 再合并，如果目标是对象，为了防止外部也保持有引用从而造成影响，需进行覆盖
         for (n in append) {
         if(append.hasOwnProperty(n)){
         dest = o[n];
         src = append[n];
         if (typeof dest === "undefined") {
         // 如果没有，复制过来
         ret[n] = src;
         } else if (typeof dest === "object") {
         // 如果都是对象，还可进行下一步合并
         if (typeof src === "object") {
         ret[n] = util.merge(dest, src, deep - 1);
         }*/
        /* else {
         // primitive -> object 冲突，保持原属性
         }*/
        /*
         }*/
        /* else {
         // 其它情况, xxx -> primitive 冲突，保持原属性
         }*/
        /*
         }
         }
         return ret;
         },*/
        /*clone : function (obj, deep */
        /* = 20 */
        /*) {
         var o, n, i, len;
         deep = parseInt(deep, 10);
         if (window.isNaN(deep)) {
         deep = 20;
         }
         // 尝试深度超过，退出。
         if (deep <= 0) {
         //warn("对象深度超出!可能存在循环引用");
         return null;
         }
         if (obj !== null && typeof obj === 'object') {
         o = {};
         for (n in obj) {
         if (obj.hasOwnProperty(n)) {
         o[n] = util.clone(obj[n], deep - 1);
         }
         }
         } else if ($.isArray(obj)) {
         o = [];
         for (i = 0, len = obj.length; i < len; i++) {
         o.push(util.clone(obj[i], deep - 1));
         }
         } else if ($.isString(obj)) {
         o = obj.slice(0);
         } else {
         o = obj;
         }
         return o;
         },*/
        deepApply: function(dest, src) {
            var p, n;
            /*jshint forin:false*/
            for (n in src) {
                p = src[n];
                if (typeof p === "object" && typeof dest[n] === "object") {
                    util.deepApply(dest[n], p);
                    continue;
                }
                dest[n] = p;
            }
            return dest;
        },
        /**
         * 生成绑定作用对象的函数，jQuery的proxy方法用于jQuery事件时会有问题，导致同一函数的不同作用对象在off时会被一起清理。
         * http://stackoverflow.com/questions/9157101/jquery-unbind-deletes-wrong-handler-created-using-proxy
         * @param {Function} fn
         * @param {Object} scope
         * @returns {Function} proxyedFunction
         */
        proxy: function(fn, scope) {
            return function() {
                fn.apply(scope, arguments);
            };
        },
        cookie: {
            get: function(name) {
                var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"), m = document.cookie.match(r);
                //console.log("from util:"+m[1]);
                return !m ? "" : m[1];
            },
            set: function(name, value, domain, path, hour) {
                var expire;
                if (hour) {
                    expire = new Date();
                    expire.setTime(expire.getTime() + 36e5 * hour);
                }
                // document.cookie = name + "=" + value + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") +
                //     (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "domain=" + document.domain + ";");
                document.cookie = name + "=" + value + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") + (path_1 ? "path=" + path_1 + "; " : "path=/; ") + (domian_1 ? "domain=" + domian_1 + ";" : "domain=" + document.domain + ";");
                console.log(name + "=" + value + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") + (path_1 ? "path=" + path_1 + "; " : "path=/; ") + (domian_1 ? "domain=" + domian_1 + ";" : "domain=" + document.domain + ";"));
                return true;
            },
            del: function(name, domain, path) {
                document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "domain=" + document.domain + ";");
            }
        },
        /**
         * 获取当前用户的uin
         * @returns {Number|string}
         */
        getUin: function() {
            return parseInt(this.cookie.get("uin").replace(/\D/g, ""), 10) || "";
        },
        /**
         * 获取防CSRF串 TODO 要确认云监控的csrf串生成规则与微信云的一致
         * @method getAntiCSRFToken
         * @return {String} 验证串
         */
        getAntiCSRFToken: function() {
            /* jshint bitwise:false */
            var s_key = this.cookie.get("skey"), hash = 5381;
            if (!s_key) {
                return "";
            }
            for (var i = 0, len = s_key.length; i < len; ++i) {
                hash += (hash << 5) + s_key.charCodeAt(i);
            }
            return hash & 2147483647;
        },
        getParam: function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        removeParam: function(url, name) {
            var reg = new RegExp("[\\?&]" + name + "=([^&#]*)", "i");
            return url.replace(reg, "");
        },
        formatDate: function() {
            function pad(number) {
                var r = String(number);
                if (r.length === 1) {
                    r = "0" + r;
                }
                return r;
            }
            return function(d, noSecond) {
                return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + (noSecond ? "" : ":" + pad(d.getSeconds()));
            };
        }()
    };
    module.exports = util;
});
