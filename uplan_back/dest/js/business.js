/**
 * Created by gmyth on 16/10/28.
 */
/**
 *	API FOR LOGIN
 *	author: Gmyth
 *	date: 20161028
 */
define("net/login", [ "lib/jquery", "util/net", "util/security" ], function factory(require, exports, module) {
    var $ = require("lib/jquery");
    var net = require("util/net");
    /**
     *    @method LOGIN
     *    @desc lOGIN USER INFO INTO DATABASE
     *    @param OBJ
     *    @param callback function
     *    @return
     */
    exports.Login = function(Login_Obj, callback) {
        //var url  = pub.parseUrl("/application/add ");
        var Obj = {
            email: Login_Obj.email,
            name: Login_Obj.username,
            password: Login_Obj.password
        };
        $.ajax({
            method: "POST",
            url: "./login",
            data: Obj
        }).done(callback);
    };
});

/**
 * 公共模块
 */
/**
 *	获取用户信息
 *	author:v_haoyuguo   
 *	date: 20160607
 */
define("net/pub", [ "lib/jquery", "util/router", "util/uri", "util/cookie", "util/net", "util/cacheData", "util/security", "util/util" ], function factory(require, exports, module) {
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
        var ticket = util.cookie.get("u_Ticket");
        var data = {
            u_Ticket: ticket
        };
        var success = function(json) {
            callback && callback(json);
        };
        $.ajax({
            method: "GET",
            url: "./account/profile",
            data: {}
        }).done(callback);
    };
});

/**
 * Created by gmyth on 16/10/8.
 */
/**
     *	API FOR SEARCH
     *	author: Gmyth
     *	date: 20161008
     */
define("net/search", [ "lib/jquery", "util/net", "util/security" ], function factory(require, exports, module) {
    var $ = require("lib/jquery");
    var net = require("util/net");
    /**
         *    @method Course
         *    @desc Search course
         *    @param namespace
         *    @param callback function 
         *    @return
         */
    exports.getCourseList = function(Obj, callback) {
        //var url  = pub.parseUrl("/application/add ");
        var url = "http://localhost:3000/get_courses_info";
        var data = {
            txtsubject: Obj.txtsubject,
            txtnumber: Obj.txtnumber,
            selnum: Obj.selnum,
            selllevel: Obj.selllevel,
            check_box_id1: Obj.check_box_id1,
            txtstarttime: Obj.txtstarttime,
            txtendtime: Obj.txtendtime
        };
        var success = function(json) {
            callback && callback(json);
        };
        var dataType = "json";
        net.post(url, JSON.stringify(data), success, dataType);
    };
});

/**
 * Created by gmyth on 16/10/28.
 */
/**
 *	API FOR SIGNUP
 *	author: Gmyth
 *	date: 20161028
 */
define("net/signup", [ "lib/jquery", "util/net", "util/security" ], function factory(require, exports, module) {
    var $ = require("lib/jquery");
    var net = require("util/net");
    /**
     *    @method SIGNUP
     *    @desc INERT USER INFO INTO DATABASE
     *    @param OBJ
     *    @param callback function
     *    @return
     */
    exports.Signup = function(SignUp_Obj, callback) {
        //var url  = pub.parseUrl("/application/add ");
        var Obj = {
            email: SignUp_Obj.email,
            password: SignUp_Obj.password,
            name: SignUp_Obj.name,
            uni: SignUp_Obj.uni,
            gender: SignUp_Obj.gender,
            YRS_EXPERIENCE: SignUp_Obj.YRS_EXPERIENCE
        };
        $.ajax({
            method: "POST",
            url: "./signup",
            data: Obj
        }).done(callback);
    };
});
