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
 * Created by kaiyu on 10/29/16.
 */
define("net/profile", [], function(require, exports, module) {});

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
        var url = "localhost:3002/get_courses_info";
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
