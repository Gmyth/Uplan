/**
 * Created with JetBrains PhpStorm.
 * User: layenlin
 * Date: 14-3-6
 * Time: 下午6:36
 * To change this template use File | Settings | File Templates.
 */
define("util/security", [ "util/cookie", "lib/jquery", "util/uri" ], function(require, exports, module) {
    var cookie = require("util/cookie");
    uri = require("util/uri");
    /**	
	 * @exports business/security
	 */
    var _public = exports, _private = {};
    /**
	* @return {number} CSRFToken
	* @example security.getCSRFToken();
	*/
    exports.getCSRFToken = function() {
        var hash = 5381, str = cookie("skey") || "";
        for (var i = 0, len = str.length; i < len; ++i) {
            hash += (hash << 5) + str.charCodeAt(i);
        }
        return hash & 2147483647;
    };
    _public.getPluginHandlers = function(settings) {
        var that = this;
        return {
            ajaxSend: function(event, xhr, options) {
                var location = uri.parseUrl(options.url);
                if (!location.hostname || location.hostname.split(".").slice(-2).join(".") == "qq.com") {
                    options.url = location.href + (location.search.indexOf("?") >= 0 ? "&" : "?") + "g_tk=" + that.getCSRFToken();
                }
            }
        };
    };
});
