/**
 * Created by Haoyu Guo on 2016/9/3.
 */
define("page/controller/module", [ "page/controller/config", "lib/jquery", "page/profile/config", "util/tpl", "util/timeparser", "net/search", "util/net", "page/profile/index", "page/sublist/index" ], function(require, exports, module) {
    var tabMap = require("page/controller/config").map;
    var $ = require("lib/jquery");
    var curTab = "flow";
    /*从url获取tab信息*/
    var getTabFromHash = function() {
        var tempurl = location.hash;
        var hash;
        hash = !location.hash ? "#metric" : location.hash;
        return hash.substring(1, hash.length);
    };
    //init function to start load js
    exports.init = function(username, namespace) {
        // for the tab part may need in future
        // curTab = getTabFromHash();
        // curUser   = username;
        // curNs     = namespace||"";
        // var target    = tabMap[ curTab ];
        // require.async( target , function( index ){
        //     index.init();
        // });
        require.async(tabMap["flow"], function(index) {
            index.init();
        });
        require.async(tabMap["sublist"], function(index) {
            index.init();
        });
        require.async(tabMap["search"], function(index) {
            index.init();
        });
    };
    /** create for profile */
    var config = require("page/profile/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var search = require("net/search");
    var profile = require("page/profile/index");
    var tmpl = {
        main: PROFILE.MAIN
    };
    /*config set*/
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
    var actionList = {
        profile: function(tar) {
            $(".profile").html(tpl.get(tmpl.main, {
                Profile: config.Profile[1]
            }));
        }
    };
});
