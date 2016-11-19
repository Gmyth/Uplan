/**
 * Created by kaiyu on 11/15/16.
 */

define(function(require, exports, module){
    var $ = require('lib/jquery')
    var tpl = require('util/tpl')
    var password = require('net/password')
    var p ="";
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 5 second for example
    var email_right = false;
    exports.init = function(){
        _bindEvent();

    };
    /*the combination of needed action function*/
    var actionList={
        'confirm_signup': function(tar){
            //检查 信息完整
            if(username_right == true && password_right == true && email_right==true && password_check_right == true){
                var obj ={
                    email:$('#email').val(),
                    name:$('#username').val(),
                    password:$('#password').val(),
                    uni: $('#university').val(),
                    gender:$('#gender').find('option:selected').val(),
                    YRS_EXPERIENCE: $('#YRS_EXPERIENCE').find('option:selected').attr('yrs')
                };
                signup.Signup(obj,function () {
                    alert('success');
                })
            }else{
                $("#Signup_msg").html('<p class="error_msg"> <span class="fui-cross" style="color: #e63c5f"></span>Please complete the form to continue Sign up!</p>')
            }
        },
        'click_google':function(tar){
            $.ajax({
                method: "GET",
                url: "./auth/google",
            }).done(callback);
        }
    };
    /*bind the button input control event*/

    var _bindEvent = function(){
        Signup = $("#Signup");
        Signup.on('click', '[data-action]', function () {
            if($(this).attr("disabled")!="disabled"){
                var actionName = $(this).data('action');
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        })

        Signup .on('input','#email',function(){
            var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            /*No Underscore at first and last*/
            var temp = $('#email').val();
            if(temp.length>0){
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
                function doneTyping () {
                    //do something
                    if(pattern.test(temp)){
                        $('#email_info').html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">THANK YOU</b>');
                        $('#email').addClass("is_success");
                        $('#email').removeClass("is_error");
                        email_right =true;
                    }else{
                        $('#email_info').html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">NOT VALID</b>');
                        $('#email').removeClass("is_success");
                        $('#email').addClass("is_error");
                        email_right = false;
                    }
                }
            }else{
                clearTimeout(typingTimer);
                $('#email_info').html('EMAIL <b class="info_guide"></b>');
                $('#email').removeClass("is_success");
                $('#email').removeClass("is_error");
                email_right = false;
            }
        })

    };
});