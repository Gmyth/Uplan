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
    var sectionList = {};
    var tmpl = {
        main:SUBLIST.MAIN,
        course:SUBLIST.COURSE,
        subcourse:SUBLIST.SUBCOURSE,
        rec:SUBLIST.RECITATION
    }
    exports.init = function(){
        $('.sub_list').html(tpl.get(tmpl.main));
         ShowCourse1();
        _bindEvent();
    };
    exports.ShowCourse = function(data){
        DataParse(data);
        $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList}));
    }
    var ShowCourse1 = function(){
        DataParse(config);
        $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList}));
    }
    var DataParse = function(data){
        CourseList=[];
        for (var i = 0; i < data.length;i++){
            var item = data[i];
            if(!subList.hasOwnProperty(item.Course.replace(/\s+/g, ''))){
               /*onl have this course in database*/
               var it = {
                   Course: item.Course,
                   Title: item.Title,
                   open: false,
                   data: item
               }
                subList[item.Course.replace(/\s+/g, '')] =[];
                CourseList.push(it);
            }
            SignIn(item);
        }
    }
    var SignIn = function(element){
        /*check single elemnt*/
        var name = element.Course.replace(/\s+/g, '');
        if(element.Type=='LEC' ||element.Type=='SEM' || element.Type == 'TUT'){
            subList[name].push(element);
        }else if(element.Type == 'LAB' || element.Type == 'REC'){
            var Section = element.Section.replace(/[0-9]/g, '');
            if(sectionList[name] == null){
                sectionList[name]= {};
                sectionList[name][Section]=[]
                sectionList[name][Section].push(element);
            }else{
                if(sectionList[name][Section]==null){
                    sectionList[name][Section]=[];
                    sectionList[name][Section].push(element);
                }else{
                    sectionList[name][Section].push(element);
                }
            }
        }
    }
    var Resize = function(){
        $('.subtag').each(function(index, value) {
            var width = $(this).width();
            $(this).find('.info_block').width(width-60);
            var checkbox_width = (58 - $(this).find('.checkbox_for_add_course').width())/2;
            var checkbox_height =($(this).find('.info_block').height()+6- $(this).find('.checkbox_for_add_course').height())/2;
            $(this).find('.checkbox_for_add_course').attr("style","display:block;padding-left:"+checkbox_width+"px;"+"padding-right: "+checkbox_width+"px;"+"padding-top: "+checkbox_height+"px;"+"padding-bottom: "+checkbox_height+"px;")
         }
        )
        // var width = $('.subtag').width();
        // $('.info_block').width(width-60);
        // var checkbox_height =($('.info_block').height()+6- $('.checkbox_for_add_course').height())/2;
        // var checkbox_width = (56 - $('.checkbox_for_add_course').width())/2;
        // $('.checkbox_for_add_course').each(function(index, element) {
        //     $(this).attr("style","display:block;padding-left:"+checkbox_width+"px;"+"padding-right: "+checkbox_width+"px;"+"padding-top: "+checkbox_height+"px;"+"padding-bottom: "+checkbox_height+"px;");
        // });
    }
    /*the combination of needed action function*/
    var actionList={
        "drop_down":function(tar){
            //update database first
            var CourseName = $(tar).attr("coursename").replace(/\s+/g, '');
            var course_choose;
            for( var i = 0 ; i< CourseList.length;i++){
                var obj = CourseList[i];
                if(CourseName==obj.Course.replace(/\s+/g, '')){
                    CourseList[i].open = true;
                    course_choose = CourseList[i];
                    break;
                }
            }
            // $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList}));
            // $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList}));
            // make new a for close dropdown
            var courseinfo = ' &nbsp;<a href="#" coursename='+course_choose.Course.replace(/\s+/g, '')+' class="dropdown-toggle tag_open" data-action = "drop_up" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>'+
            '&nbsp;'+course_choose.Course+'&nbsp;&nbsp;'+course_choose.Title+'&nbsp;' +
            '&nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>'
            $(tar).parent().parent().find('.tag_list').html(tpl.get(tmpl.subcourse,{"TagList":subList[CourseName]}))
            $(tar).parent().html(courseinfo);
            Resize();
            Resize();
            $(".info_block").hover(function () {
                    var item = JSON.parse($(this).attr("courseData"));
                    flow.update(item,false);
                }, function () {
                    flow.update();
                }
            )
        },
        "drop_up":function(tar){
            var CourseName = $(tar).attr("coursename");
            var course_choose;
            for( var i = 0 ; i< CourseList.length;i++){
                var obj = CourseList[i];
                if(CourseName==obj.Course.replace(/\s+/g, '')){
                    CourseList[i].open = false;
                    course_choose = obj;
                    break;
                }
            }
            var courseinfo = ' &nbsp;<a href="#" coursename='+course_choose.Course.replace(/\s+/g, '')+' class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>'+
                '&nbsp;'+course_choose.Course+'&nbsp;&nbsp;'+course_choose.Title+'&nbsp;' +
                '&nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>'
            $(tar).parent().parent().find('.tag_list').html("");
            $(tar).parent().html(courseinfo);
        },
        "add_course":function(tar){
            var info = $(tar).parent().parent().children().first().attr('courseData');
            var item = JSON.parse(info);
            var coursename = $(tar).attr('name').replace(/\s+/g, '');
            var section = $(tar).attr('section');
            if( sectionList[coursename]!= null){
                var list = sectionList[coursename][section];
                $('.list-block').html(tpl.get(tmpl.rec,{"RecList":list}));
                Resize();
                Resize();
            }
            flow.update(item,true);
        },
        "add_rec":function(tar){
            var info = $(tar).parent().parent().children().first().attr('courseData');
            var item = JSON.parse(info);
            flow.update(item,true);
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function(){
        $sub_list = $(".sub_list");
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