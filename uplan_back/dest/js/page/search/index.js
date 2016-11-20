/**
 * Created by kaiyu on 9/26/16.
 */
define("page/search/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser", "net/search", "util/net", "page/sublist/index", "page/sublist/config", "page/flow/index" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var search = require("net/search");
    var sublist = require("page/sublist/index");
    var tmpl = {
        main: SEARCH.MAIN
    };
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function() {
        $(".search_sub_box").html(tpl.get(tmpl.main));
    };
    /*the comlllbination of needed action function*/
    var actionList = {
        start: function(tar) {},
        storedata: function(tar) {
            var input_subject = $("#txtsubject").val();
            var input_select_number = $("#selnumber").val();
            var input_number = $("#txtnumber").val();
            var input_select_level = $("#sellevel").val();
            var input_open = $("#checkbox1:checked").val();
            var input_select_start = $("#selstart").val();
            var input_starttime = $("#txtstarttime").val();
            var input_select_end = $("#selend").val();
            var input_endtime = $("#txtendtime").val();
            var input_select_credit = $("#selcredit").val();
            var input_credit = $("#txtcredit").val();
            var Obj = {
                txtsubject: input_subject,
                txtnumber: input_select_number,
                selnum: input_number,
                selllevel: input_select_level,
                check_box_id1: input_open == undefined ? "0" : "1",
                txtstarttime: input_starttime,
                txtendtime: input_endtime,
                selstart: parseInt(input_select_start),
                selend: parseInt(input_select_end)
            };
            var success = function(data) {
                // callback
                sublist.ShowCourse(data);
            };
            search.getCourseList(Obj, success);
            $.ajax({
                method: "GET",
                url: "./get_courses_info",
                data: Obj
            }).done(success);
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".search_sub_box");
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
    };
    exports.init = function() {
        $(".search_sub_box").html(tpl.get(tmpl.main));
        _bindEvent();
    };
});
