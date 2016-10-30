define("util/Login", [ "lib/jquery", "util/util", "net/pub", "util/router", "util/cacheData", "util/net" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var util = require("util/util");
    var currrent_url = "localhost:3000/";
    var pub = require("net/pub");
    var Login = {
        user: "",
        init: function() {
            var url = location.href, oaParam = [ "sessionKey", "length", "loginParam", "ticket" ], needRedirect = 0;
            //由于跳转需要时间，故需要返回
            var removeOaParam = function() {
                var search = location.search;
                for (var i in oaParam) {
                    search = util.removeParam(search, oaParam[i]);
                }
                location.search = search;
            };
            var ticket = util.getParam("ticket");
            if (ticket) {
                removeOaParam();
            } else {
                ticket = $.cookie("ticket");
                if (!ticket) {
                    location.href = currrent_url + "login.html";
                    needRedirect = 1;
                }
            }
            return needRedirect;
        },
        redirect: function() {
            location.href = currrent_url + "login.html";
        },
        param: function() {
            var u_Ticket = $.cookie("ticket");
            return {
                type: "u",
                u_Ticket: u_Ticket || ""
            };
        },
        logout: function() {
            var url = location.href;
            util.cookie.del("ticket");
            util.cookie.del("login_user");
            location.href = currrent_url + "login.html";
        },
        fetchUser: function(fn) {
            var me = this;
            pub.getLoginInfo(function(data) {
                if (data.errno == 0) {
                    var temp = data.data;
                    me.user = temp["username"];
                    if (typeof fn == "function") {
                        fn(temp);
                    }
                } else {
                    me.redirect();
                }
            });
        }
    };
    module.exports = Login;
});