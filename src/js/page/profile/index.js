/**
 * Created by kaiyu on 10/28/16.
 */

define(function(require, exports, module){
    var $ = require('lib/jquery')
    var config = require('page/profile/config').data;
    var tpl = require('util/tpl')
    var timeparser = require('util/timeparser')
    var search = require('net/search')
    var sublist = require('page/sublist/index')
    var tmpl = {
        main:PROFILE.MAIN,
    }
    /*config set*/
    var timeStart=8;
    var timeEnd=21;
    exports.init = function(){
        $('.profile').html(tpl.get(tmpl.main,{"Profile":config.Profile[1]}));
    };

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

});