/**
 * Created by gmyth on 16/9/7.
 */
define("page/flow/index", [ "lib/jquery", "util/tpl" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var tpl = require("util/tpl");
    var tmpl = {
        main: FLOW.MIAN
    };
    exports.init = function() {
        $(".main_container").html(tpl.get(tmpl.main));
    };
});
