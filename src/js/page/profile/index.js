/**
 * Created by kaiyu on 10/28/16.
 */

define(function (require, exports, module) {
    var $ = require('lib/jquery')
    var config = require('page/profile/config').data;
    var tpl = require('util/tpl')
    var timeparser = require('util/timeparser')
    var search = require('net/search')
    var sublist = require('page/sublist/index')
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 5 second for example

    var tmpl = {
        main: PROFILE.MAIN,
        change: PROFILE.CHANGING
    }
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function () {
        $('.profile').html(tpl.get(tmpl.main, {"Profile": config.Profile[1]}));
        _bindEvent();
    };

    /*bind the button input control event*/
    var _bindEvent = function () {
        $main = $(".profile");
        $main.off();
        $main.on('click', '[data-action]', function () {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data('action');
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        }),
            $main.on('input', '#email', function () {
                var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
                /*No Underscore at first and last*/
                var temp = $('#email').val();
                if (temp.length > 0) {
                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                    function doneTyping() {
                        //do something
                        if (pattern.test(temp)) {
                            $('#email_info').html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">THANK YOU</b>');
                            $('#email').addClass("is_success");
                            $('#email').removeClass("is_error");
                        } else {
                            $('#email_info').html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">NOT VALID</b>');
                            $('#email').removeClass("is_success");
                            $('#email').addClass("is_error");
                        }
                    }
                } else {
                    clearTimeout(typingTimer);
                    $('#email_info').html('EMAIL <b class="info_guide"></b>');
                    $('#email').removeClass("is_success");
                    $('#email').removeClass("is_error");
                }
            })
    };

    var actionList = {
        "start": function (tar) {

        },
        "save_change": function (tar) {
            var input_university = $("#university").val();
            var input_major = $("#major").val();
            var input_gender = $("#gender").val();
            var input_email = $("#email").val();
            var input_yrs_experience = $("#yrs_experience").val();

        },
        "profile_edit": function (tar) {
            $('.profile').html(tpl.get(tmpl.change, {"Profile": config.Profile[1]}));
            $("#university").val(config.Profile[1].university);
            $("#major").val(config.Profile[1].major);
            $("#email").val(config.Profile[1].email);
            // $("#yrs_experience").val(config.Profile[1].yrs_experience);
            if (config.Profile[1].yrs_experience == "Freshman (1 yrs)") {
                $("#yrs_experience").find("option[value='0']").prop("selected", true);
            }
            else if (config.Profile[1].yrs_experience == "Sophomore (2 yrs)") {
                $("#yrs_experience").find("option[value='1']").prop("selected", true);
            }
            else if (config.Profile[1].yrs_experience == "Junior (3 yrs)") {
                $("#yrs_experience").find("option[value='2']").prop("selected", true);
            }
            else if (config.Profile[1].yrs_experience == "Senior (4 yrs)") {
                $("#yrs_experience").find("option[value='3']").prop("selected", true);
            }
            else {
                $("#yrs_experience").find("option[value='4']").prop("selected", true);
            }

            if (config.Profile[1].gender == "Male") {
                $("#gender").find("option[value='0']").prop("selected", true);
            }
            else if (config.Profile[1].gender == "Female") {
                $("#gender").find("option[value='1']").prop("selected", true);
            }
            else {
                $("#gender").find("option[value='2']").prop("selected", true);
            }

        },
        "profile": function (tar) {
            $('.profile').html(tpl.get(tmpl.main, {"Profile": config.Profile[1]}));
        },


    };

});