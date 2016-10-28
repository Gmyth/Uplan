/**
 * Created by gmyth on 16/10/8.
 */
/**
     *	API FOR SEARCH
     *	author: Gmyth
     *	date: 20161008
     */
define("net/search", [ "lib/jquery" ], function factory(require, exports, module) {
    var $ = require("lib/jquery");
    // var net = require('util/net');
    /**
         *    @method Course
         *    @desc Search course
         *    @param namespace
         *    @param callback function 
         *    @return
         */
    exports.getCourseList = function(Obj, callback) {
        //var url  = pub.parseUrl("/application/add ");
        var url = "./get_courses_info";
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
