/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Schedule module
 * */
define(function(require, exports, module){
    var $ = require('lib/jquery')
    var config = require('page/flow/config').data.Course;
    var tpl = require('util/tpl')
    var timeparser = require('util/timeparser')
    var dataArr=[];/*2D array*/
    var user = "";
    var tmpl = {
        main:FLOW.MAIN,
        body:FLOW.COURSE
    }
    /*config set*/
    var timeStart=8;
    var timeEnd=21;
    exports.init = function(username){
        user=username;
        $('.main_container').html(tpl.get(tmpl.main));
        var container_height = $('.main_container').height();
        $('.main_body').height(container_height-60);
        $('.main_body').css("max-height",container_height-60);
        // $('#flow_body').html(tpl.get(tmpl.test,{'startTime':timeStart,'CourseList':dataArr}));
        FillFlow();/*Data already added in global dadaArr*/
        $('#flow_body').html(tpl.get(tmpl.body,{'startTime':timeStart,'CourseList':dataArr}))
        _bindEvent();
    };
    exports.update = function(item,ADD){
        //Just hover or add
        if(ADD==false){
            var tempArr = JSON.parse(JSON.stringify(dataArr));
            var TimeInfo =timeparser.TimeSpan(item.Time);
            var DayInfo = timeparser.DaySpan(item.Days);
            for(var d=0;d<DayInfo.length;d++){
                var day_index = DayInfo[d]-1;
                var start_index = TimeInfo.start.minute == 30?(TimeInfo.start.hour - timeStart)*2+1:(TimeInfo.start.hour - timeStart)*2;
                for(var j=0;j<TimeInfo.span;j++){
                    if(j!=0) {
                        if(typeof tempArr[start_index + j][day_index] ==="object"&& tempArr[start_index + j][day_index]!=null){
                            tempArr[start_index + j][day_index].conflict = true;
                        }else {
                            tempArr[start_index + j][day_index] = false;
                        }
                    }else{
                        var temp = tempArr[start_index][day_index];
                        var s = typeof temp;
                        if(typeof temp === "object"&& temp!=null){
                            temp.conflict = true;
                        }else if(typeof temp === "boolean"){
                            var cur_index  = start_index;
                            while(typeof tempArr[cur_index][day_index] !="object" || tempArr[cur_index][day_index]==null){
                                cur_index--;
                            }
                            tempArr[cur_index][day_index].conflict = true;;
                        }else {
                            item.hover =  true
                            item.span = TimeInfo.span.toString();
                            tempArr[start_index][day_index] = item;
                        }
                    }
                }
            }
            $('#flow_body').html(tpl.get(tmpl.body,{"startTime":timeStart,"CourseList":tempArr}));
        }else{
            if(item) {
                FillFlow(item);
            }
            $('#flow_body').html(tpl.get(tmpl.body,{"startTime":timeStart,"CourseList":dataArr}));
        }
    }
    var windowHeight =  function() {
        var de = document.documentElement;
        return self.innerHeight||(de && de.clientHeight)||document.body.clientHeight;
    }
    var FillFlow = function(NewC){
        dataArr=[];
        /*from 8:00 to 21:00*/
        for(var i =0; i < (timeEnd-timeStart+1)*2;i++){
            /*data format [] with size 7 refers to each day*/
            var tempArr=[]
            tempArr.length = 7;
            dataArr.push(tempArr);
        }
        if(NewC){
            config.push(NewC);
        }
        for(var i=0;i<config.length;i++){
            var item = config[i];
            var TimeInfo =timeparser.TimeSpan(item.Time);
            var DayInfo = timeparser.DaySpan(item.Days);
            for(var d=0;d<DayInfo.length;d++){
                var day_index = DayInfo[d]-1;
                var start_index = TimeInfo.start.minute == 30?(TimeInfo.start.hour - timeStart)*2+1:(TimeInfo.start.hour - timeStart)*2;
                for(var j=0;j<TimeInfo.span;j++){
                    if(j!=0) {
                        dataArr[start_index + j][day_index] = true;
                    }else{
                        item.span = TimeInfo.span.toString();
                        dataArr[start_index][day_index] = item;
                    }
                }
            }
        }
    }
    /*the combination of needed action function*/
    var actionList={
        "start":function(tar){
            dataArr=[];
            /*from 8:00 to 21:00*/
            for(var i =0; i < (timeEnd-timeStart+1)*2;i++){
                /*data format [] with size 7 refers to each day*/
                var tempArr=[]
                tempArr.length = 7;
                dataArr.push(tempArr);
            }
            $('#flow_body').html(tpl.get(tmpl.body,{"startTime":timeStart,"CourseList":dataArr}))
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function(){
        $main = $(".main_container");
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

