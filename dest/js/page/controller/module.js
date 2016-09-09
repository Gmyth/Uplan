/**
 * Created by Haoyu Guo on 2016/9/3.
 */
define("page/controller/module", [ "page/controller/config", "lib/jquery" ], function(require, exports, module) {
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
    //初始化方法，每个都需要
    exports.init = function(username, namespace) {
        //curTab = getTabFromHash();
        curUser = username;
        curNs = namespace || "";
        var target = tabMap[curTab];
        require.async(target, function(index) {
            index.init();
        });
    };
});
