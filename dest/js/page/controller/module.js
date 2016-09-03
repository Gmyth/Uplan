/**
 * Created by Haoyu Guo on 2016/9/3.
 */
define("page/controller/module", [], function(require, exports, module) {
    //var tabMap    = require("page/controller/config").map;
    var curTab = "metric";
    var curNs = "";
    var curUser = "";
    /*从url获取tab信息*/
    var getTabFromHash = function() {
        var tempurl = location.hash;
        var hash;
        hash = !location.hash ? "#metric" : location.hash;
        return hash.substring(1, hash.length);
    };
    //初始化方法，每个都需要
    exports.init = function(username, namespace) {
        curTab = getTabFromHash();
        curUser = username;
        curNs = namespace || "";
    };
    //得到当前用户名称
    exports.getCurUser = function() {
        return curUser;
    }, //切换namespace
    exports.switchNS = function(ns) {
        if (!ns || ns == curNs) {
            return;
        }
        curNs = ns || "";
        curTab = getTabFromHash();
        exports.nav(curTab, true);
    };
    //定位到某个tab去
    exports.nav = function(tar, force) {
        if (!tar || curTab == tar && !force) {
            return;
        }
        curTab = tar;
        if (curTab == "metric") {
            $("#metric_container").removeClass("hidden-container");
            $("#metric_container").siblings().addClass("hidden-container");
        } else if (curTab == "view") {
            $("#view_container").removeClass("hidden-container");
            $("#view_container").siblings().addClass("hidden-container");
        } else if (curTab == "statistic") {
            $("#statistic_container").removeClass("hidden-container");
            $("#statistic_container").siblings().addClass("hidden-container");
        } else if (curTab == "publish") {
            $("#publish_container").removeClass("hidden-container");
            $("#publish_container").siblings().addClass("hidden-container");
        } else if (curTab == "application") {
            $("#application_container").removeClass("hidden-container");
            $("#application_container").siblings().addClass("hidden-container");
        } else if (curTab == "user") {
            $("#user_container").removeClass("hidden-container");
            $("#user_container").siblings().addClass("hidden-container");
        } else if (curTab == "operationflow") {
            $("#operationflow_container").removeClass("hidden-container");
            $("#operationflow_container").siblings().addClass("hidden-container");
        } else if (curTab == "autoreport") {
            $("#autoreport_container").removeClass("hidden-container");
            $("#autoreport_container").siblings().addClass("hidden-container");
        } else if (curTab == "nmmanager") {
            $("#nmmanager_container").removeClass("hidden-container");
            $("#nmmanager_container").siblings().addClass("hidden-container");
        }
        var target = tabMap[curTab];
        require.async(target, function(index) {
            index.init();
        });
    };
    //获取当前的tab
    exports.getCurTab = function() {
        return curTab;
    };
    //获取当前的namespace
    exports.getCurNamespace = function() {
        return curNs;
    };
});
