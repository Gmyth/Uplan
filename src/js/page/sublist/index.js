/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Search list
 * */
define(function(require, exports, module){
    var $ = require('lib/jquery')
    var config = require('page/sublist/config').data.Course;
    var tpl = require('util/tpl')
    var timeparser = require('util/timeparser')
    var timeStart;
    var timeEnd;
    var tmpl = {
        main:SUBLIST.MAIN,
        test:SUBLIST.TEST,
        tag:SUBLIST.SUBTAG,
    }
    exports.init = function(){
        $('.sub_list').html(tpl.get(tmpl.main));
        _bindEvent();
    };
    var FillFlow = function(){
        /*from 8:00 to 21:00*/
        for(var i =timeStart; i < timeEnd-timeStart;i++){
        }
    }
    var Resize = function(){
        var width = $('.subtag').width();
        $('.info_block').width(width-60);
        var checkbox_height =($('.info_block').height()+6- $('.checkbox_for_add_course').height())/2;
        var checkbox_width = (56 - $('.checkbox_for_add_course').width())/2;
        $('.checkbox_for_add_course').each(function(index, element) {
            $(this).attr("style","display:block;padding-left:"+checkbox_width+"px;"+"padding-right: "+checkbox_width+"px;"+"padding-top: "+checkbox_height+"px;"+"padding-bottom: "+checkbox_height+"px;");
        });
    }
    /*the combination of needed action function*/
    var actionList={
        "drop_down":function(tar){
            // $(tar).parent().parent().children().eq(1).html("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            $(tar).closest('.sub_main_tag').parent().find('.tag_list').html(tpl.get(tmpl.tag,{"TagList":config}));
            $(tar).parent().html('&nbsp;<a href="#" ' +
                'coursename="CSE 331" class="tag_open dropdown-toggle"' +
                ' data-action = "drop_up" style="display:inline-block">' +
                '<b class="caret" style="margin-left: 0px;"></b>' +
                '</a> &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;' +
                '&nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>');
            Resize();// first resize can't get right width of lng block
            Resize();
        },
        "drop_up":function(tar){
            $(tar).closest('.sub_main_tag').parent().find('.tag_list').html("");
            $(tar).parent().html('&nbsp;<a href="#" ' +
                'coursename="CSE 331" class="tag dropdown-toggle tag_ready"' +
                ' data-action = "drop_down" style="display:inline-block">' +
                '<b class="caret" style="margin-left: 0px;"></b>' +
                '</a> &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;' +
                '&nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>');
        },
    };
    /*bind the button input control event*/
    var _bindEvent = function(){
        $sub_list = $(".sub_list");
        $sub_list.off();
        $sub_list.on('click', '[data-action]', function () {
            if($(this).attr("disabled")!="disabled"){
                var actionName = $(this).data('action');
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        })
        $(window).resize(function() {
            Resize();
        });
    };
});