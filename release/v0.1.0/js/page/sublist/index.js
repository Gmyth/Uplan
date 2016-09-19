/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Search list
 * */
define("page/sublist/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var timeStart;
    var timeEnd;
    var tmpl = {
        main: SUBLIST.MAIN
    };
    exports.init = function() {
        $(".sub_list").html(tpl.get(tmpl.main));
        _bindEvent();
    };
    var FillFlow = function() {
        /*from 8:00 to 21:00*/
        for (var i = timeStart; i < timeEnd - timeStart; i++) {}
    };
    /*the combination of needed action function*/
    var actionList = {
        drop_down: function(tar) {
            $(tar).parent().html('&nbsp;<a href="#" ' + 'coursename="CSE 331" class="tag_open dropdown-toggle"' + ' data-action = "drop_up" style="display:inline-block">' + '<b class="caret" style="margin-left: 0px;"></b>' + "</a> &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;" + "");
        },
        drop_up: function(tar) {
            $(tar).parent().html('&nbsp;<a href="#" ' + 'coursename="CSE 331" class="tag dropdown-toggle tag_ready"' + ' data-action = "drop_down" style="display:inline-block">' + '<b class="caret" style="margin-left: 0px;"></b>' + "</a> &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;" + "");
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".sub_list");
        $main.off();
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
    };
});
