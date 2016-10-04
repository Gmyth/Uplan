/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Search list
 * */
define(function(require, exports, module){
    var $ = require('lib/jquery')
    var config = require('page/sublist/config').data.Course;
    var tpl = require('util/tpl')
    var timeparser = require('util/timeparser')
    var flow = require('page/flow/index')
    var timeStart=8;
    var timeEnd=21;
    var CourseList=[];
    var subList ={};
    var tmpl = {
        main:SUBLIST.MAIN,
        course:SUBLIST.COURSE,
    }
    exports.init = function(){
        $('.sub_list').html(tpl.get(tmpl.main));
         ShowCourse();
        _bindEvent();
    };
    var ShowCourse = function(){
        DataParse(config);
        $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList}));
    }
    var DataParse = function(data){
        CourseList=[];
        for (var i = 0; i < data.length;i++){
            var item = data[i];
            if(!subList.hasOwnProperty(item.Course)&&item.Section.length==1){
               /* does not have this course in database */
               var data = {
                   Course: item.Course,
                   Title: item.Title,
                   open:false,
                   data:[item]
               }
                subList[item.Course] = {};
                CourseList.push(data)
            }
            else if(item.Section.length==1){
                /*means not the son,just diff section*/
                for( var i = 0 ; i< CourseList.length;i++){
                    var obj = CourseList[i];
                    if(item.Course==obj.Course){
                        CourseList[i].data.append(item);
                        break;
                    }
                }
            }
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
            var CourseName = $(tar).attr("coursename");
            for( var i = 0 ; i< CourseList.length;i++){
                var obj = CourseList[i];
                if(CourseName==obj.Course){
                    CourseList[i].open = true;
                    break;
                }
            }
            $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList}));
            Resize();
            Resize();
            $(".info_block").hover(function () {
                    var item = JSON.parse($(this).attr("courseData"));
                    flow.update(item);
                }, function () {
                    flow.update();
                }
            )
        },
        "drop_up":function(tar){
            var CourseName = $(tar).attr("coursename");
            for( var i = 0 ; i< CourseList.length;i++){
                var obj = CourseList[i];
                if(CourseName==obj.Course){
                    CourseList[i].open = false;
                    break;
                }
            }
            $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList,"TagList":[]}));
        }
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
        })
    };
});