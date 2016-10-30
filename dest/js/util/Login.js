<<<<<<< HEAD
/**
 * Created by gmyth on 16/10/28.
 */
define("util/Login", [ "lib/jquery", "util/util", "net/pub" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var util = require("util/util");
=======
define("util/Login", [ "lib/jquery", "util/util", "net/pub", "util/router", "util/cacheData", "util/net" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var util = require("util/util");
    var currrent_url = "localhost:3000/";
>>>>>>> common
    var pub = require("net/pub");
    var Login = {
        user: "",
        init: function() {
<<<<<<< HEAD
            var url = location.href, Param = [ "sessionKey", "length", "lengh", "loginParam", "ticket" ], needRedirect = 0;
=======
            var url = location.href, oaParam = [ "sessionKey", "length", "loginParam", "ticket" ], needRedirect = 0;
>>>>>>> common
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
<<<<<<< HEAD
                $.cookie("ticket", ticket, {
                    domain: "barad.isd.com"
                });
=======
>>>>>>> common
                removeOaParam();
            } else {
                ticket = $.cookie("ticket");
                if (!ticket) {
<<<<<<< HEAD
                    location.href = "http://passport.oa.com/modules/passport/signin.ashx?url=" + encodeURIComponent(url);
=======
                    location.href = currrent_url + "login.html";
>>>>>>> common
                    needRedirect = 1;
                }
            }
            return needRedirect;
        },
        redirect: function() {
<<<<<<< HEAD
            location.href = "http://passport.oa.com/modules/passport/signin.ashx?url=" + encodeURIComponent(location.href);
        },
        param: function() {
            var oaTicket = $.cookie("ticket");
            return {
                type: "oa",
                oaTicket: oaTicket || ""
=======
            location.href = currrent_url + "login.html";
        },
        param: function() {
            var u_Ticket = $.cookie("ticket");
            return {
                type: "u",
                u_Ticket: u_Ticket || ""
>>>>>>> common
            };
        },
        logout: function() {
            var url = location.href;
            util.cookie.del("ticket");
            util.cookie.del("login_user");
<<<<<<< HEAD
            location.href = "http://www.oa.com/api/loginout.ashx?ref=" + encodeURIComponent(location.href);
=======
            location.href = currrent_url + "login.html";
>>>>>>> common
        },
        fetchUser: function(fn) {
            var me = this;
            pub.getLoginInfo(function(data) {
                if (data.errno == 0) {
                    var temp = data.data;
<<<<<<< HEAD
                    me.user = temp["LoginName"];
                    me._setUser(temp);
=======
                    me.user = temp["username"];
>>>>>>> common
                    if (typeof fn == "function") {
                        fn(temp);
                    }
                } else {
<<<<<<< HEAD
                    if (data.errno == -511) {
                        me.logout();
                    } else {
                        me.redirect();
                    }
                }
            });
        },
        _setUser: function(data) {
            this._userInfo = data;
        },
        getUserInfo: function() {
            return this._userInfo;
        },
        hasPermission: function(type) {
            var me = this, ret = false;
            switch (type) {
              case "cat":
                if ($.inArray(me.user, [ "fonkiechen", "loryluo", "cloudyang", "ownyang", "chenkeliu", "lijuntan", "leelli", "hailongli" ]) > -1) {
                    ret = true;
                }
                break;
            }
            return ret;
=======
                    me.redirect();
                }
            });
>>>>>>> common
        }
    };
    module.exports = Login;
});
