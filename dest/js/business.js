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
