define("util/Login", [ "lib/jquery", "util/util", "net/pub", "util/router", "util/cacheData", "util/net" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var util = require("util/util");
    var currrent_url = "http://localhost:3000/";
    var pub = require("net/pub");
    var Login = {
        user: "",
        init: function() {
            var url = location.href, oaParam = [ "sessionKey", "length", "loginParam", "u_Ticket" ], needRedirect = 0;
            //由于跳转需要时间，故需要返回
            var removeOaParam = function() {
                var search = location.search;
                for (var i in oaParam) {
                    search = util.removeParam(search, oaParam[i]);
                }
                location.search = search;
            };
            var ticket = util.getParam("u_Ticket");
            if (ticket) {
                removeOaParam();
            } else {
                ticket = $.cookie("u_Ticket");
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
            var u_Ticket = $.cookie("u_Ticket");
            return {
                type: "u",
                u_Ticket: u_Ticket || ""
            };
        },
        logout: function() {
            var url = location.href;
            util.cookie.del("u_Ticket");
            util.cookie.del("login_user");
            location.href = currrent_url + "login.html";
        },
        fetchUser: function(fn) {
            var me = this;
            pub.getLoginInfo(function(data) {
                if (data.errno == "200") {
                    var temp = data.data.profile;
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
