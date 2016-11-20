/**
 * Created by kaiyu on 10/25/16.
 */
define("page/password/index", [ "lib/jquery", "util/tpl" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var tpl = require("util/tpl");
    var tmpl = {};
    var p = "";
    var typingTimer;
    //timer identifier
    var doneTypingInterval = 1e3;
    //time in ms, 5 second for example
    exports.init = function() {
        _bindEvent();
    };
    /*the combination of needed action function*/
    var actionList = {
        submit_email: function(tar) {
            var find_email = $("#email").val();
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $password = $("#password");
        $password.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        }), $password.on("input", "#email", function() {
            var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            /*No Underscore at first and last*/
            var temp = $("#email").val();
            if (temp.length > 0) {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
                function doneTyping() {
                    //do something
                    if (pattern.test(temp)) {
                        $("#email_info").html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">THANK YOU</b>');
                        $("#email").addClass("is_success");
                        $("#email").removeClass("is_error");
                    } else {
                        $("#email_info").html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">NOT VALID</b>');
                        $("#email").removeClass("is_success");
                        $("#email").addClass("is_error");
                    }
                }
            } else {
                clearTimeout(typingTimer);
                $("#email_info").html('EMAIL <b class="info_guide"></b>');
                $("#email").removeClass("is_success");
                $("#email").removeClass("is_error");
            }
        });
    };
});
