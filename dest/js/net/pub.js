/**
 * 公共模块
 */
/**
 *	获取用户信息
 *	author:v_haoyuguo   
 *	date: 20160607
 */
define("net/pub", [ "lib/jquery", "util/router", "util/net", "util/security", "util/util" ], function factory(require, exports, module) {
    var $ = require("lib/jquery");
    var router = require("util/router");
    var cacheData = require("util/cacheData");
    var net = require("util/net");
    var util = require("util/util");
    // /**
    //  *	@method parseUrl(绝对域名配制方法)
    //  *	@desc 动态拼接url
    //  *	@param cgiUrl
    //  *	@return
    //  */
    //
    // exports.parseUrl = function(cgi){
    //      var CurUrl= location.href;
    //      var Urltab = CurUrl.substring(CurUrl.indexOf('http://')+7,CurUrl.indexOf('.'));
    //     if(Urlconfig.hasOwnProperty(Urltab) ){
    //         return Urlconfig[Urltab]+cgi;
    //     }else{
    //         return "http://dev.api.selfconf.barad.isd.com"+cgi;
    //     }
    //     // return  CurUrl.substring(0, CurUrl.indexOf('.com') >= 0 ? CurUrl.indexOf('.com') : 0)+cgi;
    //
    // }
    /**
     *	@method getLoginInfo
     *	@desc 获取用户信息
     *	@param callback function 回调函数
     *	@return
     */
    exports.getLoginInfo = function(callback) {
        var url = this.parseUrl("/Auth/Login");
        //var url  = "http://dev.api.join.barad.isd.com/Auth/Login";
        var ticket = util.cookie.get("ticket");
        var data = {
            oaTicket: ticket
        };
        var success = function(json) {
            callback && callback(json);
        };
        var dataType = "json";
        net.post(url, JSON.stringify(data), success, dataType);
    };
});
