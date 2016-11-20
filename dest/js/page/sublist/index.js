/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Search list
 * */
define("page/sublist/index", [ "lib/jquery", "page/sublist/config", "util/tpl", "util/timeparser", "page/flow/index", "page/flow/config", "net/flow", "net/sublist", "util/router", "util/cacheData", "util/net", "util/util" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/sublist/config").data.Course;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var flow = require("page/flow/index");
    var sublist = require("net/sublist");
    var timeStart = 8;
    var timeEnd = 21;
    var hoverTimer;
    var CourseList = [];
    var subList = {};
    var username = "";
    var sectionList = {};
    var defaultSection = "";
    var curDetail = {};
    var tmpl = {
        main: SUBLIST.MAIN,
        course: SUBLIST.COURSE,
        subcourse: SUBLIST.SUBCOURSE,
        rec: SUBLIST.RECITATION,
        detail: SUBLIST.DETAIL,
        comment: SUBLIST.COMMENT
    };
    exports.init = function(user) {
        $(".sub_list").html(tpl.get(tmpl.main));
        username = user;
        //ShowCourse1();
        _bindEvent();
    };
    exports.ShowCourse = function(data) {
        subList = {};
        sectionList = {};
        DataParse(data);
        if (CourseList.length == 0) {
            $(".list-block").html('<div class="sub_success" style="margin-top: 15%"><div style="text-align: center"><img src="img/icons/svg/loop.svg" alt="Infinity-Loop"></div> <h5 style="color: #34495e; text-align: center"> Sorry, there is no course matched with your requirement </h5><hr style="width: 100%; margin: auto;border-top: 1px solid #34495e;"><p style="color: #34495e; text-align: center"> Please double check the title of the course</p></div>');
        } else {
            $(".list-block").html(tpl.get(tmpl.course, {
                CourseList: CourseList
            }));
        }
    };
    var ShowCourse1 = function() {
        DataParse(config);
        $(".list-block").html(tpl.get(tmpl.course, {
            CourseList: CourseList
        }));
    };
    var DataParse = function(data) {
        CourseList = [];
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (!subList.hasOwnProperty(item.Course.replace(/\s+/g, ""))) {
                /*onl have this course in database*/
                var it = {
                    Course: item.Course,
                    Title: item.Title,
                    open: false,
                    data: item
                };
                subList[item.Course.replace(/\s+/g, "")] = [];
                CourseList.push(it);
            }
            SignIn(item);
        }
    };
    var SignIn = function(element) {
        /*check single elemnt*/
        defaultSection = "";
        var name = element.Course.replace(/\s+/g, "");
        if (element.Type == "LEC" || element.Type == "SEM" || element.Type == "TUT") {
            subList[name].push(element);
        } else if (element.Type == "LAB" || element.Type == "REC") {
            var Section = element.Section.replace(/[0-9]/g, "");
            defaultSection = Section;
            if (sectionList[name] == null) {
                sectionList[name] = {};
                sectionList[name][Section] = [];
                sectionList[name][Section].push(element);
            } else {
                if (sectionList[name][Section] == null) {
                    sectionList[name][Section] = [];
                    sectionList[name][Section].push(element);
                } else {
                    sectionList[name][Section].push(element);
                }
            }
        }
    };
    var Resize = function(rec) {
        if (!rec) {
            $(".subtag").each(function(index, value) {
                var width = $(this).width();
                $(this).find(".info_block").width(width - 60);
                var checkbox_width = (58 - $(this).find(".checkbox_for_add_course").width()) / 2;
                var checkbox_height = ($(this).find(".info_block").height() + 6 - $(this).find(".checkbox_for_add_course").height()) / 2;
                $(this).find(".checkbox_for_add_course").attr("style", "display:block;padding-left:" + checkbox_width + "px;" + "padding-right: " + checkbox_width + "px;" + "padding-top: " + checkbox_height + "px;" + "padding-bottom: " + checkbox_height + "px;");
            });
        } else {
            $(".subtag").each(function(index, value) {
                var width = $(this).width();
                $(this).find(".rec_block").width(width - 60);
                var checkbox_width = (58 - $(this).find(".checkbox_for_add_rec").width()) / 2;
                var checkbox_height = ($(this).find(".rec_block").height() + 6 - $(this).find(".checkbox_for_add_rec").height()) / 2;
                $(this).find(".checkbox_for_add_rec").attr("style", "display:block;padding-left:" + checkbox_width + "px;" + "padding-right: " + checkbox_width + "px;" + "padding-top: " + checkbox_height + "px;" + "padding-bottom: " + checkbox_height + "px;");
            });
        }
    };
    var showDetail = function(tar) {
        curDetail = {};
        var course_data = JSON.parse($(tar).children().eq(0).attr("courseData"));
        var success = function(data) {
            if (data.errno = "200") {
                var test = data.data[0];
                curDetail = test;
                $("#detail_box").html(tpl.get(tmpl.detail, {
                    it: test
                }));
                $("#course_detail").modal("show");
            } else {
                alert(data.error);
            }
        };
        sublist.getCourseDetail(course_data, success);
    };
    var showComments = function(tar) {
        if (!$("#comment_list").html() || $("#comment_list").html() == " ") {
            var success = function(data) {
                if (data.errno = "200") {
                    var DataList = [];
                    for (var i = 0; i < data.data.length; i++) {
                        var obj = {};
                        obj.updateAt = data.data[i].meta.updateAt.toString().slice(0, 10).split(" ");
                        obj.comments = data.data[i].comments;
                        obj.username = data.data[i].username;
                        DataList.push(obj);
                    }
                    $("#comment_list").html(tpl.get(tmpl.comment, {
                        CommentList: DataList
                    }));
                } else {
                    alert(data.error);
                }
            };
            sublist.getComment(curDetail, success);
        } else {
            $("#comment_list").html("");
        }
    };
    /*the combination of needed action function*/
    var actionList = {
        drop_down: function(tar) {
            //update database first
            var CourseName = $(tar).attr("coursename").replace(/\s+/g, "");
            var course_choose;
            for (var i = 0; i < CourseList.length; i++) {
                var obj = CourseList[i];
                if (CourseName == obj.Course.replace(/\s+/g, "")) {
                    CourseList[i].open = true;
                    course_choose = CourseList[i];
                    break;
                }
            }
            // $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList}));
            // $('.list-block').html(tpl.get(tmpl.course,{"CourseList":CourseList}));
            // make new a for close dropdown
            var courseinfo = ' &nbsp;<a href="#" coursename=' + course_choose.Course.replace(/\s+/g, "") + ' class="dropdown-toggle tag_open" data-action = "drop_up" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>' + "&nbsp;" + course_choose.Course + "&nbsp;&nbsp;" + course_choose.Title + "&nbsp;" + '&nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>';
            $(tar).parent().parent().find(".tag_list").html(tpl.get(tmpl.subcourse, {
                TagList: subList[CourseName]
            }));
            $(tar).parent().html(courseinfo);
            Resize();
            Resize();
            $(".info_block").hover(function() {
                clearTimeout(hoverTimer);
                var item = JSON.parse($(this).attr("courseData"));
                var delay = function() {
                    flow.update(item, false);
                };
                hoverTimer = setTimeout(delay, 250);
            }, function() {
                var delay = function() {
                    flow.update();
                };
                setTimeout(delay, 250);
            });
        },
        drop_up: function(tar) {
            var CourseName = $(tar).attr("coursename");
            var course_choose;
            for (var i = 0; i < CourseList.length; i++) {
                var obj = CourseList[i];
                if (CourseName == obj.Course.replace(/\s+/g, "")) {
                    CourseList[i].open = false;
                    course_choose = obj;
                    break;
                }
            }
            var courseinfo = ' &nbsp;<a href="#" coursename=' + course_choose.Course.replace(/\s+/g, "") + ' class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>' + "&nbsp;" + course_choose.Course + "&nbsp;&nbsp;" + course_choose.Title + "&nbsp;" + '&nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>';
            $(tar).parent().parent().find(".tag_list").html("");
            $(tar).parent().html(courseinfo);
        },
        add_course: function(tar) {
            $(".list-block").fadeOut(125);
            // var fadeLate = function() {
            var info = $(tar).parent().parent().children().first().children().first().attr("courseData");
            var item = JSON.parse(info);
            var coursename = $(tar).attr("name").replace(/\s+/g, "");
            var section = $(tar).attr("section");
            if (sectionList[coursename] != null) {
                if (section == "000") {
                    var list = sectionList[coursename][defaultSection];
                } else {
                    var list = sectionList[coursename][section];
                }
            }
            $(".list-block").html(tpl.get(tmpl.rec, {
                RecList: list
            }));
            $(".list-block").fadeIn(125);
            Resize(true);
            Resize(true);
            setTimeout(flow.update(item, true), 125);
            $(".rec_block").hover(function() {
                clearTimeout(hoverTimer);
                var item = JSON.parse($(this).attr("courseData"));
                var delay = function() {
                    flow.update(item, false);
                };
                hoverTimer = setTimeout(delay, 250);
            }, function() {
                var delay = function() {
                    flow.update();
                };
                setTimeout(delay, 250);
            });
        },
        add_rec: function(tar) {
            $(".list-block").fadeOut(125);
            // var fadeLate = function() {
            var info = $(tar).parent().parent().children().first().attr("courseData");
            var item = JSON.parse(info);
            flow.update(item, true);
            $(".list-block").html('<div class="sub_success" style="margin-top: 15%"><div style="text-align: center"><img src="img/icons/svg/retina.svg" alt="Retina"></div> <h5 style="color: #34495e; text-align: center"> Course already added into your course list</h5><hr style="width: 100%; margin: auto;border-top: 1px solid #34495e;"><p style="color: #34495e; text-align: center"> Start new search to add more course</p></div>');
            $(".list-block").fadeIn(125);
        },
        show_details: function(tar) {
            showDetail(tar);
        },
        open_student_comments: function(tar) {
            showComments(tar);
        },
        comments_window: function(tar) {
            $("#course_detail").modal("hide");
            $("#comment_modal").modal("show");
        },
        close_comment: function(tar) {
            $("#course_detail").modal("show");
        },
        submit_comment: function(tar) {
            //add new comment for course
            var comments = $("#comment_Textarea").val();
            var obj = {
                _id: curDetail._id,
                name: username,
                comments: comments
            };
            var success = function(data) {
                if (data.errno = "200") {
                    $("#course_detail").modal("show");
                    showComments();
                } else {
                    alert(data.error);
                }
            };
            sublist.addComment(obj, success);
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $sub_list = $(".sub_list");
        $sub_list.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
        $(window).resize(function() {
            Resize();
            Resize(true);
        });
    };
});
