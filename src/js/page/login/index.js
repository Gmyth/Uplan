/**
 * Created by kaiyu on 10/25/16.
 */

define(function(require, exports, module){
    var $ = require('lib/jquery')
    var tpl = require('util/tpl')
    var tmpl = {
    }
    var p ="";
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 5 second for example
    exports.init = function(){
        _bindEvent();

    };
    /*the combination of needed action function*/
    var actionList={
        "start":function(tar){

        },
        "logindata":function(tar){
            var login_username = $("#loginusername").val();
            var login_password = $("#loginpassword").val();
        }
    };

    var _bindEvent = function(){

    };
});