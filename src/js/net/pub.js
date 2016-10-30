/**
 * 公共模块
 */
/**
 *	获取用户信息
 *	author:v_haoyuguo   
 *	date: 20160607
 */
define(function factory( require, exports, module){

    var $ 			= require('lib/jquery');
    var router 		= require('util/router');
    var cacheData 	= require('util/cacheData');
    var net     	= require('util/net');
    var util     	= require('util/util');

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
    
    exports.getLoginInfo = function(callback){
        var ticket=util.cookie.get("u_Ticket");
        var data ={
            "u_Ticket":ticket
        };
        ;
        var success = function(json){
            callback && callback( json );
        }
        $.ajax({
            method: "GET",
            url: "./account/profile",
            data: {}
        }).done(callback);
    };

});
