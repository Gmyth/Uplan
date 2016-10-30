/**
 * Created by gmyth on 16/10/28.
 */
define("util/Login", [ "lib/jquery", "util/util", "net/pub" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var util = require("util/util");
    var pub = require("net/pub");
    var Login = {
        user: "",
        init: function() {
            var url = location.href, Param = [ "sessionKey", "length", "lengh", "loginParam", "ticket" ], needRedirect = 0;
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
                $.cookie("ticket", ticket, {
                    domain: "barad.isd.com"
                });
                removeOaParam();
            } else {
                ticket = $.cookie("ticket");
                if (!ticket) {
                    location.href = "http://passport.oa.com/modules/passport/signin.ashx?url=" + encodeURIComponent(url);
                    needRedirect = 1;
                }
            }
            return needRedirect;
        },
        redirect: function() {
            location.href = "http://passport.oa.com/modules/passport/signin.ashx?url=" + encodeURIComponent(location.href);
        },
        param: function() {
            var oaTicket = $.cookie("ticket");
            return {
                type: "oa",
                oaTicket: oaTicket || ""
            };
        },
        logout: function() {
            var url = location.href;
            util.cookie.del("ticket");
            util.cookie.del("login_user");
            location.href = "http://www.oa.com/api/loginout.ashx?ref=" + encodeURIComponent(location.href);
        },
        fetchUser: function(fn) {
            var me = this;
            pub.getLoginInfo(function(data) {
                if (data.errno == 0) {
                    var temp = data.data;
                    me.user = temp["LoginName"];
                    me._setUser(temp);
                    if (typeof fn == "function") {
                        fn(temp);
                    }
                } else {
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
        }
    };
    module.exports = Login;
});
