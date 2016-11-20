/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Schedule module
 * */
define("page/flow/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser", "net/flow", "util/router", "util/cacheData", "util/net", "util/util" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data.Course;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var flow = require("net/flow");
    var dataArr = [];
    /*2D array*/
    var user = "";
    var tempArr_del = [];
    var result = [];
    var tmpl = {
        main: FLOW.MAIN,
        body: FLOW.COURSE,
        selected: FLOW.SELECTED
    };
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function(username) {
        var dataArr = [];
        user = username;
        weekparse(timeparser.getMonday(new Date()));
        weekparse(timeparser.getTuesday(new Date()));
        weekparse(timeparser.getWednesday(new Date()));
        weekparse(timeparser.getThursday(new Date()));
        weekparse(timeparser.getFriday(new Date()));
        weekparse(timeparser.getSaturday(new Date()));
        $(".main_container").html(tpl.get(tmpl.main, {
            Week: result
        }));
        var container_height = $(".main_container").height();
        $(".main_body").height(container_height - 60);
        $(".main_body").css("max-height", container_height - 60);
        showList();
        // $('#flow_body').html(tpl.get(tmpl.test,{'startTime':timeStart,'CourseList':dataArr}));
        _bindEvent();
    };
    exports.update = function(item, ADD) {
        //Just hover or add
        if (ADD == false) {
            var tempArr = JSON.parse(JSON.stringify(dataArr));
            var TimeInfo = timeparser.TimeSpan(item.Time);
            var DayInfo = timeparser.DaySpan(item.Days);
            for (var d = 0; d < DayInfo.length; d++) {
                var day_index = DayInfo[d] - 1;
                var start_index = TimeInfo.start.minute == 30 ? (TimeInfo.start.hour - timeStart) * 2 + 1 : (TimeInfo.start.hour - timeStart) * 2;
                for (var j = 0; j < TimeInfo.span; j++) {
                    if (j != 0) {
                        if (typeof tempArr[start_index + j][day_index] === "object" && tempArr[start_index + j][day_index] != null) {
                            tempArr[start_index + j][day_index].conflict = true;
                        } else {
                            tempArr[start_index + j][day_index] = false;
                        }
                    } else {
                        var temp = tempArr[start_index][day_index];
                        var s = typeof temp;
                        if (typeof temp === "object" && temp != null) {
                            temp.conflict = true;
                        } else if (typeof temp === "boolean") {
                            var cur_index = start_index;
                            while (typeof tempArr[cur_index][day_index] != "object" || tempArr[cur_index][day_index] == null) {
                                cur_index--;
                            }
                            tempArr[cur_index][day_index].conflict = true;
                        } else {
                            item.hover = true;
                            item.span = TimeInfo.span.toString();
                            tempArr[start_index][day_index] = item;
                        }
                    }
                }
            }
            $("#flow_body").html(tpl.get(tmpl.body, {
                startTime: timeStart,
                CourseList: tempArr
            }));
        } else {
            if (item) {
                FillFlow(item);
            }
            $("#flow_body").html(tpl.get(tmpl.body, {
                startTime: timeStart,
                CourseList: dataArr
            }));
        }
    };
    var weekparse = function(data) {
        var date = data;
        // Mon Nov 08 2010
        var dateArr = date.toString().slice(0, 10).split(" ");
        result.push(dateArr[1] + " " + dateArr[2]);
    };
    var showList = function() {
        config = [];
        var success = function(data) {
            if (data.errno = "200") {
                config = data.data.profile.course_taking;
                if (!config) {
                    config = [];
                }
                FillFlow();
                $("#flow_body").html(tpl.get(tmpl.body, {
                    startTime: timeStart,
                    CourseList: dataArr
                }));
            } else {
                alert(data.error);
            }
        };
        $.ajax({
            method: "GET",
            url: "./account/profile",
            data: {}
        }).done(success);
    };
    var windowHeight = function() {
        var de = document.documentElement;
        return self.innerHeight || de && de.clientHeight || document.body.clientHeight;
    };
    var FillFlow = function(NewC) {
        dataArr = [];
        /*from 8:00 to 21:00*/
        for (var i = 0; i < (timeEnd - timeStart + 1) * 2; i++) {
            /*data format [] with size 7 refers to each day*/
            var tempArr = [];
            tempArr.length = 7;
            dataArr.push(tempArr);
        }
        if (NewC) {
            var same = false;
            for (var i = 0; i < config.length; i++) {
                if (config[i].Course == NewC.Course && config[i].Type == NewC.Type) {
                    config[i] = NewC;
                    same = true;
                    break;
                }
            }
            if (same == false) {
                config.push(NewC);
            }
        }
        for (var i = 0; i < config.length; i++) {
            var item = config[i];
            var TimeInfo = timeparser.TimeSpan(item.Time);
            var DayInfo = timeparser.DaySpan(item.Days);
            for (var d = 0; d < DayInfo.length; d++) {
                var day_index = DayInfo[d] - 1;
                var start_index = TimeInfo.start.minute == 30 ? (TimeInfo.start.hour - timeStart) * 2 + 1 : (TimeInfo.start.hour - timeStart) * 2;
                for (var j = 0; j < TimeInfo.span; j++) {
                    if (j != 0) {
                        dataArr[start_index + j][day_index] = true;
                    } else {
                        item.span = TimeInfo.span.toString();
                        dataArr[start_index][day_index] = item;
                    }
                }
            }
        }
    };
    /*the combination of needed action function*/
    var actionList = {
        start: function(tar) {
            dataArr = [];
            /*from 8:00 to 21:00*/
            for (var i = 0; i < (timeEnd - timeStart + 1) * 2; i++) {
                /*data format [] with size 7 refers to each day*/
                var tempArr = [];
                tempArr.length = 7;
                dataArr.push(tempArr);
            }
            $("#flow_body").html(tpl.get(tmpl.body, {
                startTime: timeStart,
                CourseList: dataArr
            }));
        },
        view_selected: function(tar) {
            tempArr_del = config.slice();
            $("#selected_list").html(tpl.get(tmpl.selected, {
                TagList: config
            }));
            $("#view_selected").modal("show");
        },
        save_course: function(tar) {
            config = tempArr_del;
            var temp_dataArr = [];
            for (var i = 0; i < config.length; i++) {
                temp_dataArr.push(config[i]._id);
            }
            var success = function(data) {
                if (data.errno = "200") {
                    showList();
                    $("#save_schedule").modal("show");
                } else {
                    alert(data.eror);
                }
            };
            flow.saveCourse(temp_dataArr, success);
        },
        save_schedule: function(tar) {
            var temp_dataArr = [];
            for (var i = 0; i < config.length; i++) {
                temp_dataArr.push(config[i]._id);
            }
            var success = function(data) {
                if (data.errno = "200") {
                    showList();
                    $("#save_schedule").modal("show");
                } else {
                    alert(data.eror);
                }
            };
            flow.saveCourse(temp_dataArr, success);
        },
        del_course: function(tar) {
            var id_del = $(tar).parent().parent().attr("course_info");
            for (var i = 0; i < tempArr_del.length; i++) {
                if (tempArr_del[i]._id == id_del) {
                    tempArr_del.splice(i, 1);
                }
            }
            $("#selected_list").html(tpl.get(tmpl.selected, {
                TagList: tempArr_del
            }));
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".main_container");
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
    };
});
