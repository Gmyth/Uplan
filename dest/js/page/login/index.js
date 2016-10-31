/**
 * Created by kaiyu on 10/25/16.
 */
define("page/login/index", [ "lib/jquery", "util/tpl", "util/util", "net/login", "util/net" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var tpl = require("util/tpl");
    var util = require("util/util");
    var login = require("net/login");
    var p = "";
    var typingTimer;
    //timer identifier
    var doneTypingInterval = 1e3;
    //time in ms, 5 second for example
    exports.init = function() {
        _bindEvent();
    };
    var login_check = function() {};
    /*the combination of needed action function*/
    var actionList = {
        start: function(tar) {},
        logindata: function(tar) {
            var obj = {};
            var login_username = $("#username").val();
            var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            /*No Underscore at first and last*/
            if (pattern.test(login_username)) {
                obj.email = login_username;
            } else {
                obj.username = login_username;
            }
            var login_password = $("#password").val();
            obj.password = login_password;
            var success = function(data) {
                if (data.errno == "0") {
                    util.cookie.set("u_Ticket", data.data);
                    location.href = "http://localhost:3000/";
                } else {
                    alert(data.error);
                }
            };
            login.Login(obj, success);
        },
        click_google: function(tar) {
            $.ajax({
                method: "GET",
                url: "./auth/google"
            }).done(callback);
        }
    };
    var _bindEvent = function() {
        $main = $("#login");
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
    };
});
