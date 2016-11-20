/**
 * Created by kaiyu on 10/28/16.
 */
define("page/profile/index", [ "lib/jquery", "util/tpl", "util/timeparser", "net/search", "util/net", "page/sublist/index", "page/sublist/config", "page/flow/index", "net/sublist", "net/profile", "util/router", "util/cacheData", "util/util" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = {};
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var search = require("net/search");
    var sublist = require("page/sublist/index");
    var profile = require("net/profile");
    var typingTimer;
    //timer identifier
    var doneTypingInterval = 1e3;
    //time in ms, 5 second for example
    var Curuser = "";
    var tmpl = {
        main: PROFILE.MAIN,
        change: PROFILE.CHANGING
    };
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function(username) {
        updateProfile();
        Curuser = username;
        _bindEvent();
    };
    var updateProfile = function() {
        var success = function(data) {
            if (data.errno == "200") {
                var temp = data.data.profile;
                $("#profile").html(tpl.get(tmpl.main, {
                    Profile: temp
                }));
                config.Profile = temp;
            } else {
                alert(data.error);
            }
        };
        profile.getProfile(success);
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $("#profile");
        $main.off();
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        }), $main.on("input", "#email", function() {
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
    var actionList = {
        save_change: function(tar) {
            var input_university = $("#university").val();
            var input_major = $("#major").val();
            var input_gender = $("#gender").find("option:selected").text();
            var input_yrs_experience = $("#yrs_experience").find("option:selected").attr("value");
            var obj = {
                university: input_university,
                gender: input_gender,
                YRS_EXPERIENCE: input_yrs_experience,
                major: input_major,
                username: Curuser
            };
            var success = function(data) {
                if (data.errno == "200") {
                    updateProfile();
                } else {
                    alert(data.error);
                }
            };
            profile.editProfile(obj, success);
        },
        profile_edit: function(tar) {
            $("#profile").html(tpl.get(tmpl.change, {
                Profile: config.Profile
            }));
            $("#university").val(config.Profile.university);
            $("#major").val(config.Profile.major);
            $("#email").val(config.Profile.email);
            // $("#yrs_experience").val(config.Profile[1].yrs_experience);
            if (config.Profile.yearExperience == "1") {
                $("#yrs_experience").find("option[value='1']").prop("selected", true);
            } else if (config.Profile.yearExperience == "2") {
                $("#yrs_experience").find("option[value='2']").prop("selected", true);
            } else if (config.Profile.yearExperience == "3") {
                $("#yrs_experience").find("option[value='3']").prop("selected", true);
            } else if (config.Profile.yearExperience == "4") {
                $("#yrs_experience").find("option[value='4']").prop("selected", true);
            } else {
                $("#yrs_experience").find("option[value='5']").prop("selected", true);
            }
            if (config.Profile.gender == "Male") {
                $("#gender").find("option[value='0']").prop("selected", true);
            } else if (config.Profile.gender == "Female") {
                $("#gender").find("option[value='1']").prop("selected", true);
            } else {
                $("#gender").find("option[value='2']").prop("selected", true);
            }
        }
    };
});
