/**
 * Created by kaiyu on 11/11/16.
 */
define("page/profile/index", [ "lib/jquery", "page/profile/config", "util/tpl", "util/timeparser", "net/search", "util/net", "page/sublist/index", "page/sublist/config", "page/flow/index" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/profile/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var search = require("net/search");
    var sublist = require("page/sublist/index");
    var tmpl = {
        main: PROFILE.FIRST
    };
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function() {
        $(".profile").html(tpl.get(tmpl.main, {
            Profile: config.Profile[1]
        }));
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".profile");
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
