/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Schedule module
 * */
define("page/flow/index", [ "lib/jquery", "util/tpl" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var tpl = require("util/tpl");
    var tmpl = {
        main: FLOW.MAIN
    };
    exports.init = function() {
        $(".main_container").html(tpl.get(tmpl.main));
        _bindEvent();
    };
    /*the combination of needed action function*/
    var actionList = {};
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".main_container");
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
