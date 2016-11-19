/**
 * Created by kaiyu on 11/11/16.
 */

define(function(require, exports, module){

    /** create for profile */
    var $ = require("lib/jquery");
    var config = require('page/profile/config').data;
    var tpl = require('util/tpl');
    var timeparser = require('util/timeparser');
    //var module_1 = require('page/controller/module');
    var profile = require('page/profile/index');

    var tmpl = {
        main:PROFILE.FIRST
    }
    /*config set*/
    exports.init= function(){
        _bindEvent();
    }
    /*bind the button input control event*/
    var _bindEvent = function(){
        $main = $(".profile");
        $main.off();
        $main.on('click', '[data-action]', function () {
            if($(this).attr("disabled")!="disabled"){
                var actionName = $(this).data('action');
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        })
    };

    var actionList={
        "profile":function(tar){
            $('.profile').html(tpl.get(tmpl.main,{"Profile":config.Profile}));
        },

        "close_profile":function(){
            //module_1.init();
        }
    }

});
