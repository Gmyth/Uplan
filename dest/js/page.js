/**
 *	config.js
 *	author：liamhuang
 *	date：20150720
 *
 **/
define("page/controller/config", [], function(require, exports, module) {
    exports.map = {
        flow: "page/flow/index"
    };
});

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

/**
 * Created by gmyth on 16/9/7.
 */
define("page/flow/index", [ "lib/jquery", "util/tpl" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var tpl = require("util/tpl");
    var tmpl = {
        main: '    <p class="text-muted">        Hi,HaoyuGuo    </p>'
    };
    exports.init = function() {
        $(".main_container").html(tpl.get(tmpl.main));
    };
});
