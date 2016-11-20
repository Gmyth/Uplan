
/**
 * Created by Haoyu Guo on 2016/10/30.
 */
define(function(require, exports, module){
    var $ = require("lib/jquery");
    var util = require("util/util");
    var currrent_url = "http://uplans.info/";
    var Login = {
        user: "",
        check: function() {
            var success = function(data) {
                if (data.errno = "200") {
                    if (!$.cookie("u_Ticket")) {
                        util.cookie.set("u_Ticket", data.data.sessionId);
                    }
                }
            };
            $.ajax({
                method: "GET",
                url: "./account/profile",
                data: {}
            }).done(success);
        }
    };
    module.exports = Login;
});