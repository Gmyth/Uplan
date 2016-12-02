/**
 *	config.js
 *	author：haoyuguo
 *	date：20150720
 *
 **/
define("page/controller/config", [], function(require, exports, module) {
    exports.map = {
        flow: "page/flow/index",
        sublist: "page/sublist/index",
        search: "page/search/index",
        profile: "page/profile/index"
    };
});

/**
 * Created by Haoyu Guo on 2016/9/3.
 */
define("page/controller/module", [ "page/controller/config", "util/tpl", "lib/jquery", "widget/bootstrap", "util/util" ], function(require, exports, module) {
    var tabMap = require("page/controller/config").map;
    var tpl = require("util/tpl");
    var $ = require("lib/jquery");
    var bootstrap = require("widget/bootstrap");
    var curTab = "flow";
    var curUser = "";
    /*从url获取tab信息*/
    var tmpl = {
        main: '    <img src="img/favicon.png" alt="Retina">    <h5 style="color: #FFFFFF; text-align: center">Happy &nbsp;<%=weekday%>&nbsp;,&nbsp;&nbsp;<span style="color: #FFFFFF;"><%=username%></span ></h5>    <p style="color: #FFFFFF; text-align: center"> What are we going to do today?</p>    <hr style="width: 50%; margin: auto;">    <div class="row demo-row" style="margin-top: 10px;">        <div class="col-xs-3" style="margin-left: 25%;">            <a href="javascript:void(0)" class="btn btn-block btn-lg btn-primary" data-action="profile_open">Edit profile</a>        </div>        <div class="col-xs-3">            <a href="javascript:void(0)" class="btn btn-block btn-lg btn-info" data-action="schedule_page">Build schedule</a>        </div>    </div>',
        subbox: '    <div class="search_box">        <div class="Uheader" style="background-color: #34495e">            <p class ="sub_Uheader">                <span class="fui-search" style="color:#1abc9c;position: relative;top: 1px;"></span> &nbsp;Course Search &nbsp; </p> </div>        <div class="search_sub_box" ></div></div>    <div class="result_box" style="height: 82%;">    <div class ="Uheader" style=" background-color: #34495e">        <p class="sub_Uheader">            <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;"></span> &nbsp;Course List &nbsp; </p> </div>    <div class="sub_list" style="height: 93%;">        </div>    </div>    '
    };
    var myDays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
    var showMain = function() {
        $("#welcome_msg").html("");
        $("#welcome_msg").hide();
        $("#sub_box").html(tpl.get(tmpl.subbox));
        require.async(tabMap["flow"], function(index) {
            index.init(curUser);
        });
        require.async(tabMap["sublist"], function(index) {
            index.init(curUser);
        });
        require.async(tabMap["search"], function(index) {
            index.init(curUser);
        });
        $("#main_container").fadeIn(1e3);
        $("#sub_box").fadeIn(1e3);
    };
    var showProfile = function() {
        $("#main_container").hide();
        $("#sub_box").hide();
        $("#welcome_msg").html("");
        $("#welcome_msg").hide();
        require.async(tabMap["profile"], function(index) {
            index.init(curUser);
        });
        $("#profile").fadeIn(1e3);
    };
    var actionList = {
        profile_open: function(tar) {
            // wait for kaiyukang profile
            $("#welcome_msg").fadeOut(1e3);
            //showProfile();
            setTimeout(showProfile, 1e3);
        },
        schedule_page: function(tar) {
            $("#welcome_msg").fadeOut(1e3);
            setTimeout(showMain, 1e3);
        },
        profile: function(tar) {
            updateProfile();
            _bindEvent();
        }
    };
    //init function to start load js
    exports.init = function(username) {
        // for the tab part may need in future
        // curTab = getTabFromHash();
        // curUser   = username;
        // curNs     = namespace||"";
        // var target    = tabMap[ curTab ];
        // require.async( target , function( index ){
        //     index.init();
        // });
        curUser = username;
        $("#main_container").hide();
        $("#sub_box").hide();
        $("#profile").hide();
        var today = new Date();
        var thisDay = today.getDay();
        thisDay = myDays[thisDay];
        $("#welcome_msg").hide();
        $("#welcome_msg").html(tpl.get(tmpl.main, {
            weekday: thisDay,
            username: username
        }));
        $("#logout").click(function() {
            $.ajax({
                method: "GET",
                url: "./logout"
            }).done(function() {
                var util = require("util/util");
                util.cookie.del("u_Ticket");
                location.href = "http://uplans.info/login.html";
            });
        });
        _bindEvent();
        $("#welcome_msg").fadeIn("slow");
    };
    var _bindEvent = function() {
        $main = $("#welcome_msg");
        $demo_row = $("#header");
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
        $demo_row.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
    };
});

/**
 * Created by gmyth on 16/9/9.
 */
/*inpt data temporarily to check the functionality */
define("page/flow/config", [], function(require, exports, module) {
    exports.data = {
        Course: [ {
            _id: "57e54188304ddf23ffcdc6f5",
            status: "Closed",
            Room: "Cooke 127A",
            Title: "Software Eng Concepts",
            Section: "A1",
            instructors: "Staff",
            Days: "M",
            Course: "CSE 442LR",
            Location: "North Campus",
            Time: "3:00 PM - 3:50 PM",
            Type: "REC",
            Class: "11832"
        }, {
            _id: "57e54188304ddf23ffcdc6f4",
            status: "Open",
            Room: "Nsc 215",
            Title: "Software Eng Concepts",
            Section: "A",
            instructors: "Hartloff, J L",
            Days: "M W F",
            Course: "CSE 442LR",
            Location: "North Campus",
            Time: "2:00 PM - 2:50 PM",
            Type: "LEC",
            Class: "<<<  >>>"
        }, {
            _id: "57e54188304ddf23ffcdc6f6",
            status: "Open",
            Room: "Hoch 139",
            Title: "Software Eng Concepts",
            Section: "A2",
            instructors: "Staff",
            Days: "T",
            Course: "CSE 442LR",
            Location: "North Campus",
            Time: "2:00 PM - 2:50 PM",
            Type: "REC",
            Class: "11436"
        }, {
            _id: "57e54188304ddf23ffcdc6f7",
            status: "Open",
            Room: "Norton 214",
            Title: "Software Eng Concepts",
            Section: "A3",
            instructors: "Staff",
            Days: "R",
            Course: "CSE 442LR",
            Location: "North Campus",
            Time: "9:00 AM - 9:50 AM",
            Type: "REC",
            Class: "22346"
        } ]
    };
});

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
        main: '    <div class="main_header" style="height: 85%;">        <table  class= "weekly_schedule table-bordered table-hover table-responsive table-fit" cellspacing="0" cellpadding="2" width="100%" >            <colgroup span="1" width="9%" align="center" valign="middle"></colgroup>            <colgroup span="7" width="13%" align="center" valign="middle"></colgroup>            <thead>            <th>Time</th>            <th>Monday<br><%=Week[0]%></th>            <th>Tuesday<br><%=Week[1]%></th>            <th>Wednesday<br><%=Week[2]%></th>            <th>Thursday<br><%=Week[3]%></th>            <th>Friday<br><%=Week[4]%></th>            <th>Saturday<br><%=Week[5]%></th>            <th>Sunday<br><%=Week[6]%></th>            </thead>            <tbody id="flow_body">            </tbody>        </table>    <!-- End HTML Area -->    </div>        <div class="function_box row">            <div class="Uheader" style=" background-color: #34495e">        <p class="sub_Uheader">     <span class="fui-calendar-solid" style="color:#1abc9c;position: relative;top: 1px;"></span> &nbsp;Tool Panel &nbsp; </p> </div>            <div class="col-xs-3">                <button data-toggle="modal" class="btn btn-block btn-lg btn-primary" data-action="view_selected" >View Selected</button>                <div id="view_selected" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">                    <div  class="modal-dialog modal-lg" style="background-color: #eff0f2;border-radius: 6px;">                        <div class="modal-header" style="background-color: #34495e;">                            <a type="button" class="close" data-dismiss="modal" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>                            <p style="margin-bottom:auto;color: #eff0f2;"><b>Selected</b></p>                        </div>                        <div class="modal-body responsive-font" id="selected_list" style="height: 500px;max-height: 500px;overflow-y: auto;">                        </div>                        <div class="modal-footer modal_background_color">                            <button type="button" class="btn btn-primary" data-dismiss="modal" data-action="save_course">Save changes</button>                            <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>                        </div>                    </div>                </div>            </div>            <div class="col-xs-3">                <a href="#fakelink" class="btn btn-block btn-lg btn-warning" data-action="save_schedule">Save Schedule</a>                <div id="save_schedule" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">                    <div  class="modal-dialog" style="background-color: #eff0f2;border-radius: 6px;">                        <div class="modal-header" style="background-color: #34495e;">                            <a type="button" class="close" data-dismiss="modal" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>                            <p style="margin-bottom:auto;color: #eff0f2;"><b>Success</b></p>                        </div>                        <div class="modal-body"  style="height: 300px;max-height: 300px;overflow-y: auto;">                            <div class="sub_success"><div style="text-align: center">                                <img src="img/icons/svg/retina.svg" alt="Retina">                            </div>                                <h5 style="color: #34495e; text-align: center"> Your schedule was successfully saved! </h5>                                <hr style="width: 100%; margin: auto;border-top: 1px solid #34495e;">                                <p style="color: #34495e; text-align: center"> A satisfied course schedule is the first step to succeed </p>                            </div>                        </div>                        <div class="modal-footer modal_background_color">                            <button type="button" class="btn btn-primary btn-block" data-dismiss="modal" >OK</button>                        </div>                    </div>                </div>            </div>            <div class="col-xs-3">                <a href="#fakelink" class="btn btn-block btn-lg btn-inverse" disabled="true">Coming Soon</a>            </div>            <div class="col-xs-3">                <a href="#fakelink" class="btn btn-block btn-lg btn-danger" disabled="true">Coming Soon</a>            </div>        </div>',
        body: '    <%for(var i=0,item;item = CourseList[i];i++){%>    <tr>    <%if(i%2==0){%><td class="weekly_schedule_time_background" rowspan="2"><span ><%=startTime+(i/2)%>:00</span></td><%}%>        <%if(typeof item[0] == "object" && item[0]){%>        <%if(item[0].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>        <%}else{%>        <%if(item[0].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[0]!= "boolean"&&item[0] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[1] == "object" && item[1]){%>        <%if(item[1].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>        <%}else{%>        <%if(item[1].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[1]!= "boolean"&&item[1] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[2] == "object" && item[2]){%>        <%if(item[2].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>        <%}else{%>        <%if(item[2].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[2]!= "boolean"&&item[2] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[3] == "object" && item[3]){%>        <%if(item[3].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>        <%}else{%>        <%if(item[3].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[3]!= "boolean"&&item[3] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[4] == "object" && item[4]){%>        <%if(item[4].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>        <%}else{%>        <%if(item[4].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[4]!= "boolean"&&item[4] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[5] == "object" && item[5]){%>        <%if(item[5].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>        <%}else{%>        <%if(item[5].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[5]!= "boolean"&&item[5] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[6] == "object" && item[6]){%>        <%if(item[6].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>        <%}else{%>        <%if(item[6].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[6]!= "boolean"&&item[6] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>    </tr>    <%}%>',
        selected: '    <% for(var d = 0,it ; it = TagList[d]; d++){%>    <table class="table table-bordered table-responsive table-hover table-condensed">        <thead style="background-color: #34495e;color: #ffffff">        <tr>            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Title</th>            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Type</th>            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Section</th>            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Location</th>            <th><span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>Days</th>            <th><span class="fui-time" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>Time</th>            <th><span class="fui-location" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>&nbsp;Room</th>            <th><span class="fui-user" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>Instrouctors</th>            <th></th>        </tr>        </thead>        <tbody>        <tr course_info=<%=it._id%>>            <td><%=it.Title%></td>            <td><%=it.Type%></td>            <td><%=it.Section%></td>            <td><%=it.Location%></td>            <td><%=it.Days%></td>            <td><%=it.Time%></td>            <td><%=it.Room%></td>            <td><%=it.instructors%></td>            <td><a data-action="del_course" style=" cursor:pointer;padding: 10px;font-size: 20px;"><span class="fui-trash" ></span></a></td>        </tr>        </tbody>        </table>    <%}%>'
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
        weekparse(timeparser.getSunday(new Date()));
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

/**
 * Created by kaiyu on 10/25/16.
 */
define("page/login/index", [ "lib/jquery", "util/tpl", "util/util", "net/login", "util/net" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var tpl = require("util/tpl");
    var util = require("util/util");
    var login = require("net/login");
    var p = "";
    var typingTimer;
    //timer identifier
    var doneTypingInterval = 1e3;
    //time in ms, 5 second for example
    exports.init = function() {
        _bindEvent();
    };
    var login_check = function() {};
    /*the combination of needed action function*/
    var actionList = {
        start: function(tar) {},
        logindata: function(tar) {
            var obj = {};
            var login_username = $("#username").val();
            var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            /*No Underscore at first and last*/
            if (pattern.test(login_username)) {
                obj.email = login_username;
            } else {
                obj.username = login_username;
            }
            var login_password = $("#password").val();
            obj.password = login_password;
            var success = function(data) {
                if (data.errno == "0") {
                    util.cookie.set("u_Ticket", data.data);
                    //location.href="http://uplans.info/debug"
                    location.href = "http://uplans.info/";
                } else {
                    alert(data.error);
                }
            };
            login.Login(obj, success);
        },
        click_google: function(tar) {
            location.href = "http://uplans.info/auth/google";
        }
    };
    var _bindEvent = function() {
        $main = $("#login");
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

/**
 * Created by kaiyu on 10/25/16.
 */
define("page/password/index", [ "lib/jquery", "util/tpl" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var tpl = require("util/tpl");
    var tmpl = {};
    var p = "";
    var typingTimer;
    //timer identifier
    var doneTypingInterval = 1e3;
    //time in ms, 5 second for example
    exports.init = function() {
        _bindEvent();
    };
    /*the combination of needed action function*/
    var actionList = {
        submit_email: function(tar) {
            var find_email = $("#email").val();
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $password = $("#password");
        $password.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        }), $password.on("input", "#email", function() {
            var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            /*No Underscore at first and last*/
            var temp = $("#email").val();
            if (temp.length > 0) {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
                function doneTyping() {
                    //do something
                    if (pattern.test(temp)) {
                        $("#email_info").html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">THANK YOU</b>');
                        $("#email").addClass("is_success");
                        $("#email").removeClass("is_error");
                    } else {
                        $("#email_info").html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">NOT VALID</b>');
                        $("#email").removeClass("is_success");
                        $("#email").addClass("is_error");
                    }
                }
            } else {
                clearTimeout(typingTimer);
                $("#email_info").html('EMAIL <b class="info_guide"></b>');
                $("#email").removeClass("is_success");
                $("#email").removeClass("is_error");
            }
        });
    };
});

/**
 * Created by kaiyu on 10/28/16.
 */
define("page/profile/config", [], function(require, exports, module) {
    exports.data = {
        Profile: [ {
            username: "kaiyu",
            university: "university at buffalo",
            major: "computer science",
            gender: "Male",
            email: "test1@gmail.com",
            yrs_experience: "Freshman (1 yrs)"
        }, {
            username: "chaojie",
            university: "university at buffalo",
            major: "computer engineering",
            gender: "Female",
            email: "test2@gmail.com",
            yrs_experience: "Sophomore (2 yrs)"
        } ]
    };
});

/**
 * Created by kaiyu on 10/28/16.
 */
define("page/profile/index", [ "lib/jquery", "util/tpl", "util/timeparser", "net/search", "util/net", "page/sublist/index", "page/sublist/config", "page/flow/index", "net/sublist", "net/profile", "util/router", "util/cacheData", "util/util" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = {};
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var search = require("net/search");
    var sublist = require("page/sublist/index");
    var profile = require("net/profile");
    var typingTimer;
    //timer identifier
    var doneTypingInterval = 1e3;
    //time in ms, 5 second for example
    var Curuser = "";
    var tmpl = {
        main: '    <div id="SignIn" style="margin-top: 5%;">        <form class="profile-form" onsubmit="return false">            <div class="col-2">                <label>                    <b>USERNAME <p class="info_guide"></p></b>                        <b><%=Profile.username%></b>                </label>            </div>            <div class="col-2">                <label>                    <b>UNIVERSITY<p class="info_guide"></p></b>                    <b><%if(Profile.university){%><%=Profile.university%><%}else{%>No University!<%}%></b>                </label>            </div>            <div class="col-2">                <label>                    <b>MAJOR<p class="info_guide"></p></b>                    <b><%if(Profile.major){%><%=Profile.major%><%}else{%>No major!<%}%></b>                </label>            </div>            <div class="col-2">                <label>                    <b>GENDER<p class="info_guide"></p></b>                    <b><%=Profile.gender%></b>                </label>            </div>            <div class="col-2">                <label>                    <b>EMAIL<p class="info_guide"></p></b>                    <b><%if(Profile.email){%><%=Profile.email%><%}else{%>No Email!<%}%></b>                </label>            </div>            <div class="col-2">                <label>                    <b>YRS EXPERIENCE<p class="info_guide"></p></b>                    <b><%if(Profile.yearExperience=="1"){%>Freshman (1 yrs)<%}else if(Profile.yearExperience=="2"){%>Sophomore (2 yrs)<%}else if(Profile.yearExperience=="3"){%>Junior (3 yrs)<%}else if(Profile.yearExperience=="4"){%>Senior (4 yrs)<%}else{%>Graduated <%}%></b>                </label>            </div>            <div class="col-submit" id="change" style="display: block" >                <button class="btn btn-block btn-lg btn-success" data-action="profile_edit" >Change your profile</button>            </div>        </form>    </div>',
        change: '    <div id="SignIn1" style="margin-top: 5%;">        <form class="profile-form" onsubmit="return false">            <div class="col-2">                <label>                    <b>USERNAME <p class="info_guide"></p></b>                    <b><%=Profile.username%></b>                </label>            </div>            <div class="col-2">                <label>                    <b>UNIVERSITY<p class="info_guide"></p></b>                    <input placeholder="enter your university" id="university" name="university" tabindex="2">                </label>            </div>            <div class="col-2">                <label>                    <b>MAJOR<p class="info_guide"></p></b>                    <input placeholder="enter your major" id="major" name="major" tabindex="6">                </label>            </div>            <div class="col-2">                <label>                    <b>GENDER<p class="info_guide"></p></b>                    <select tabindex="5" id="gender">                        <option value="0">Male</option>                        <option value="1">Female</option>                        <option value="2">Other</option>                    </select>                </label>            </div>            <div class="col-2">                <label>                    <b id="email_info">EMAIL<p class="info_guide"></p></b>                    <input placeholder="enter your email" id="email" name="email" tabindex="6" disabled="disabled">                </label>            </div>            <div class="col-2">                <label>                    <b>YRS EXPERIENCE<p class="info_guide"></p></b>                    <select tabindex="7" id="yrs_experience">                        <option value="1" id="0">Freshman (1 yrs)</option>                        <option value="2">Sophomore (2 yrs)</option>                        <option value="3">Junior (3 yrs)</option>                        <option value="4">Senior (4 yrs)</option>                        <option value="5">Graduated </option>                    </select>                </label>            </div>            <div class="col-submit" id="save" data-action="save_change" style="display: block">                <button class="btn btn-block btn-lg btn-success">Save my change</button>            </div>        </form>    </div>'
    };
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function(username) {
        updateProfile();
        Curuser = username;
        _bindEvent();
    };
    var updateProfile = function() {
        var success = function(data) {
            if (data.errno == "200") {
                var temp = data.data.profile;
                $("#profile").html(tpl.get(tmpl.main, {
                    Profile: temp
                }));
                config.Profile = temp;
            } else {
                alert(data.error);
            }
        };
        profile.getProfile(success);
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $("#profile");
        $main.off();
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        }), $main.on("input", "#email", function() {
            var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            /*No Underscore at first and last*/
            var temp = $("#email").val();
            if (temp.length > 0) {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
                function doneTyping() {
                    //do something
                    if (pattern.test(temp)) {
                        $("#email_info").html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">THANK YOU</b>');
                        $("#email").addClass("is_success");
                        $("#email").removeClass("is_error");
                    } else {
                        $("#email_info").html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">NOT VALID</b>');
                        $("#email").removeClass("is_success");
                        $("#email").addClass("is_error");
                    }
                }
            } else {
                clearTimeout(typingTimer);
                $("#email_info").html('EMAIL <b class="info_guide"></b>');
                $("#email").removeClass("is_success");
                $("#email").removeClass("is_error");
            }
        });
    };
    var actionList = {
        save_change: function(tar) {
            var input_university = $("#university").val();
            var input_major = $("#major").val();
            var input_gender = $("#gender").find("option:selected").text();
            var input_yrs_experience = $("#yrs_experience").find("option:selected").attr("value");
            var obj = {
                university: input_university,
                gender: input_gender,
                YRS_EXPERIENCE: input_yrs_experience,
                major: input_major,
                username: Curuser
            };
            var success = function(data) {
                if (data.errno == "200") {
                    updateProfile();
                } else {
                    alert(data.error);
                }
            };
            profile.editProfile(obj, success);
        },
        profile_edit: function(tar) {
            $("#profile").html(tpl.get(tmpl.change, {
                Profile: config.Profile
            }));
            $("#university").val(config.Profile.university);
            $("#major").val(config.Profile.major);
            $("#email").val(config.Profile.email);
            // $("#yrs_experience").val(config.Profile[1].yrs_experience);
            if (config.Profile.yearExperience == "1") {
                $("#yrs_experience").find("option[value='1']").prop("selected", true);
            } else if (config.Profile.yearExperience == "2") {
                $("#yrs_experience").find("option[value='2']").prop("selected", true);
            } else if (config.Profile.yearExperience == "3") {
                $("#yrs_experience").find("option[value='3']").prop("selected", true);
            } else if (config.Profile.yearExperience == "4") {
                $("#yrs_experience").find("option[value='4']").prop("selected", true);
            } else {
                $("#yrs_experience").find("option[value='5']").prop("selected", true);
            }
            if (config.Profile.gender == "Male") {
                $("#gender").find("option[value='0']").prop("selected", true);
            } else if (config.Profile.gender == "Female") {
                $("#gender").find("option[value='1']").prop("selected", true);
            } else {
                $("#gender").find("option[value='2']").prop("selected", true);
            }
        }
    };
});

/**
 * Created by kaiyu on 9/26/16.
 */
define("page/search/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser", "net/search", "util/net", "page/sublist/index", "page/sublist/config", "page/flow/index", "net/sublist" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var search = require("net/search");
    var sublist = require("page/sublist/index");
    var tmpl = {
        main: '    <ul style="list-style-type:none; font-size: small;padding-bottom: 20px;">        <li >Subject            <input type="text" id="txtsubject" class="form-control input-s" placeholder="Enter here"/>        </li>        <li >Course Number            <select id="selnumber" class="form-control1 select1 select-primary select-block">                <optgroup label="course number">                    <option value="0">is exactly</option>                    <option value="1">greater than</option>                    <option value="2">less or equal</option>                </optgroup>            </select>            <input type="text" id="txtnumber" class="form-control input-s" placeholder="Enter here"/>        </li>        <li>            <a data-toggle="modal" class="hoverable" data-action="advanced_window">advanced option</a>            <button class="btn1 btn-default btn1-wide1" value="search" data-action="storedata">search</button>        </li>    </ul>        <div id="advanced_window" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">        <div class="modal-dialog modal-lg" style="background-color: #eff0f2;border-radius: 6px;">            <div class="modal-header" style="background-color: #34495e;">                <a type="button" class="close" data-dismiss="modal" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>                <p style="margin-bottom:auto;color: #eff0f2;"><b>Advanced search option</b></p>            </div>            <div class="modal-body">                <div>                    <ul style="list-style-type:none">                        <li><b style="position:relative; top: 5px" ;>Course Career</b>                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp                            <select id="sellevel" class="form-control1 select1 select-primary select-block">                                <optgroup label="course career">                                    <option value="0">undergraduate</option>                                    <option value="1">graduate</option>                                </optgroup>                            </select>                        </li>                        <li>                            <div class="span">                                <label1 class="checkbox1" for="checkbox1">                                    <input style="margin-right: 5px;" type="checkbox" value="checked"                                           id="checkbox1">                                    <b>Show Open Classes Only</b>                                </label1>                            </div>                        </li>                        <li><b>Meeting Start Time</b>                            <select id="selstart" class="form-control1 select1 select-primary select-block">                                <optgroup label="meeting start time">                                    <option value="0">is exactly</option>                                    <option value="1">greater than</option>                                    <option value="2">less than</option>                                </optgroup>                            </select>                            <input type="text" id="txtstarttime" class="form-control input-s"                                   placeholder="Enter here"/>                        </li>                        <li><b>Meeting End Time</b>                            &nbsp&nbsp                            <select id="selend" class="form-control1 select1 select-primary select-block">                                <optgroup label="meeting end time">                                    <option value="0">is exactly</option>                                    <option value="1">greater than</option>                                    <option value="2">less than</option>                                </optgroup>                            </select>                            <input type="text" id="txtendtime" class="form-control input-s"                                   placeholder="Enter here"/>                        </li>                        <li><b>Course Credits</b>                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp                            <select id="selcredit" class="form-control1 select1 select-primary select-block">                                <optgroup label="course credit">                                    <option value="0">is exactly</option>                                    <option value="1">greater than</option>                                    <option value="2">less than</option>                                </optgroup>                            </select>                            <input type="text" id="txtcredit" class="form-control input-s"                                   placeholder="Enter here"/>                        </li>                    </ul>                </div>            </div>            <div class="modal-footer modal_background_color">                <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>            </div>        </div>    </div>'
    };
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function() {
        $(".search_sub_box").html(tpl.get(tmpl.main));
    };
    /*the combination of needed action function*/
    var actionList = {
        start: function(tar) {},
        advanced_window: function(tar) {
            $("#advanced_window").modal("show");
        },
        storedata: function(tar) {
            var input_subject = $("#txtsubject").val().toLowerCase();
            var input_select_number = $("#selnumber").val();
            var input_number = $("#txtnumber").val();
            var input_select_level = $("#sellevel").val();
            var input_open = $("#checkbox1:checked").val();
            var input_select_start = $("#selstart").val();
            var input_starttime = $("#txtstarttime").val();
            var input_select_end = $("#selend").val();
            var input_endtime = $("#txtendtime").val();
            var input_select_credit = $("#selcredit").val();
            var input_credit = $("#txtcredit").val();
            var Obj = {
                txtsubject: input_subject,
                txtnumber: input_number,
                selnum: input_select_number,
                selllevel: input_select_level,
                check_box_id1: input_open == undefined ? "0" : "1",
                txtstarttime: input_starttime,
                txtendtime: input_endtime,
                selstart: parseInt(input_select_start),
                selend: parseInt(input_select_end)
            };
            var success = function(data) {
                // callback
                sublist.ShowCourse(data);
            };
            //search.getCourseList(Obj,success);
            $.ajax({
                method: "GET",
                url: "./get_courses_info",
                data: Obj
            }).done(success);
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".search_sub_box");
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
    };
    exports.init = function() {
        $(".search_sub_box").html(tpl.get(tmpl.main));
        _bindEvent();
    };
});

/**
 * Created by Haoyu Guo on 2016/10/25.
 */
/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the sign up page
 * */
define("page/signup/index", [ "lib/jquery", "util/tpl", "net/signup", "util/net", "widget/bootstrap" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var tpl = require("util/tpl");
    var signup = require("net/signup");
    var bootstrap = require("widget/bootstrap");
    var p = "";
    var typingTimer;
    //timer identifier
    var doneTypingInterval = 1e3;
    //time in ms, 5 second for example
    var username_right = false;
    var password_right = false;
    var password_check_right = false;
    var email_right = false;
    exports.init = function() {
        _bindEvent();
    };
    /*the combination of needed action function*/
    var actionList = {
        confirm_signup: function(tar) {
            //检查 信息完整
            if (username_right == true && password_right == true && email_right == true && password_check_right == true) {
                var obj = {
                    email: $("#email").val(),
                    name: $("#username").val(),
                    password: $("#password").val(),
                    uni: $("#university").val(),
                    gender: $("#gender").find("option:selected").val(),
                    YRS_EXPERIENCE: $("#YRS_EXPERIENCE").find("option:selected").attr("yrs")
                };
                signup.Signup(obj, function(data) {
                    if (data.errno = "0") {
                        $("#Sign_up_succ").modal("show");
                    } else {
                        alert(data.error);
                    }
                });
            } else {
                $("#Signup_msg").html('<p class="error_msg"> <span class="fui-cross" style="color: #e63c5f"></span>&nbsp;Please complete the form to continue Sign up!</p>');
            }
        },
        click_google: function(tar) {
            location.href = "http://uplans.info/auth/google";
        }
    };
    /*bind the button input control event*/
    PasswordCheck = function(p1, p2) {
        if (p1 === p2) {
            $("#password_r_info").html('PASSWORD  CONFIRM &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">MATCHED</b>');
            $("#PASSWORD_R").addClass("is_success");
            $("#PASSWORD_R").removeClass("is_error");
            password_check_right = true;
        } else {
            if (p2 == "" || p2.length < 6) {
                $("#password_r_info").html('PASSWORD  CONFIRM <b class="info_guide"></b>');
                $("#PASSWORD_R").removeClass("is_success");
                $("#PASSWORD_R").removeClass("is_error");
                password_check_right = false;
            } else {
                $("#password_r_info").html('PASSWORD  CONFIRM &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">DISMATCHED</b>');
                $("#PASSWORD_R").removeClass("is_success");
                $("#PASSWORD_R").addClass("is_error");
                password_check_right = false;
            }
        }
    };
    var _bindEvent = function() {
        Signup = $("#Signup");
        Signup.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
        Signup.on("input", "#username", function() {
            var pattern = /^(?!_)(?!.*?_$)[A-Za-z0-9_,]+$/;
            /*No Underscore at first and last*/
            var temp = $("#username").val();
            if (pattern.test(temp) && temp.length >= 4) {
                $("#username_info").html('USERNAME &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">GOOD NAME TO USE</b>');
                $("#username").addClass("is_success");
                $("#username").removeClass("is_error");
                username_right = true;
            } else {
                if (temp == "") {
                    $("#username_info").html('USERNAME <b class="info_guide"></b>');
                    $("#username").removeClass("is_success");
                    $("#username").removeClass("is_error");
                } else if (temp.length < 4) {
                    $("#username_info").html('USERNAME &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">TOO SHORT</b>');
                    $("#username").removeClass("is_success");
                    $("#username").removeClass("is_error");
                } else {
                    $("#username_info").html('USERNAME &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">WRONG FORMAT</b>');
                    $("#username").removeClass("is_success");
                    $("#username").addClass("is_error");
                }
                username_right = false;
            }
        });
        Signup.on("input", "#password", function() {
            var pattern = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            /*No Underscore at first and last*/
            var temp = $("#password").val();
            p = temp;
            if ($("#PASSWORD_R").val() != "") {
                PasswordCheck(p, $("#PASSWORD_R").val());
            }
            if (pattern.test(temp) && temp.length >= 6) {
                $("#password_info").html('PASSWORD &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">PERFECT PASSWORD</b>');
                $("#password").addClass("is_success");
                $("#password").removeClass("is_error");
                password_right = true;
            } else {
                if (temp == "" || temp.length < 6) {
                    $("#password_info").html('PASSWORD <b class="info_guide"></b>');
                    $("#password").removeClass("is_success");
                    $("#password").removeClass("is_error");
                } else {
                    $("#password_info").html('PASSWORD &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">WRONG FORMAT</b>');
                    $("#password").removeClass("is_success");
                    $("#password").addClass("is_error");
                }
                password_right = false;
            }
        });
        Signup.on("input", "#PASSWORD_R", function() {
            var pattern = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            /*No Underscore at first and last*/
            var temp = $("#PASSWORD_R").val();
            PasswordCheck(p, temp);
        });
        Signup.on("input", "#email", function() {
            var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            /*No Underscore at first and last*/
            var temp = $("#email").val();
            if (temp.length > 0) {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
                function doneTyping() {
                    //do something
                    if (pattern.test(temp)) {
                        $("#email_info").html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-check-circle" style=" color: #2ECC71;"></span>&nbsp;<b class="is_success">THANK YOU</b>');
                        $("#email").addClass("is_success");
                        $("#email").removeClass("is_error");
                        email_right = true;
                    } else {
                        $("#email_info").html('EMAIL &nbsp; &nbsp; &nbsp;<span class="fui-cross-circle" style=" color: #e74c3c;"></span>&nbsp;<b class="is_error">NOT VALID</b>');
                        $("#email").removeClass("is_success");
                        $("#email").addClass("is_error");
                        email_right = false;
                    }
                }
            } else {
                clearTimeout(typingTimer);
                $("#email_info").html('EMAIL <b class="info_guide"></b>');
                $("#email").removeClass("is_success");
                $("#email").removeClass("is_error");
                email_right = false;
            }
        });
    };
});

/**
 * Created by Haoyu Guo on 2016/9/27.
 */
/**
 * Created by gmyth on 16/9/9.
 */
/*inpt data temporarily to check the functionality */
define("page/sublist/config", [], function(require, exports, module) {
    exports.data = {
        Course: [ {
            _id: "57e54188304ddf23ffcdc6a9",
            status: "Open",
            Room: "Hoch 114",
            Title: "Ub Seminar-How The Internet Works",
            Section: "A",
            instructors: "*  Hartloff, J L",
            Days: "M W",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "4:00 PM  -  4:50 PM",
            Type: "SEM",
            Class: "<<<  >>>"
        }, {
            _id: "57e54188304ddf23ffcdc6aa",
            status: "Closed",
            Room: "Norton 214",
            Title: "Ub Seminar-How The Internet Works",
            Section: "A1",
            instructors: "Staff",
            Days: "T",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "9:00 AM  -  9:50 AM",
            Type: "REC",
            Class: "24441"
        }, {
            _id: "57e54188304ddf23ffcdc6ab",
            status: "Closed",
            Room: "Norton 214",
            Title: "Ub Seminar-How The Internet Works",
            Section: "A2",
            instructors: "Staff",
            Days: "T",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "10:00 AM  -  10:50 AM",
            Type: "REC",
            Class: "24442"
        }, {
            _id: "57e54188304ddf23ffcdc6ac",
            status: "Closed",
            Room: "Hoch 307",
            Title: "Ub Seminar-How The Internet Works",
            Section: "A3",
            instructors: "Staff",
            Days: "M",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "9:00 AM  -  9:50 AM",
            Type: "REC",
            Class: "24443"
        }, {
            _id: "57e54188304ddf23ffcdc6ae",
            status: "Open",
            Room: "Knox 110",
            Title: "Ub Seminar-How The Internet Works",
            Section: "B",
            instructors: "*  Hertz, M",
            Days: "M W",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "4:00 PM  -  4:50 PM",
            Type: "SEM",
            Class: "<<<  >>>"
        }, {
            _id: "57e54188304ddf23ffcdc6ad",
            status: "Closed",
            Room: "Cooke 248",
            Title: "Ub Seminar-How The Internet Works",
            Section: "A4",
            instructors: "Staff",
            Days: "M",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "8:00 AM  -  8:50 AM",
            Type: "REC",
            Class: "24444"
        }, {
            _id: "57e54188304ddf23ffcdc6af",
            status: "Closed",
            Room: "Norton 209",
            Title: "Ub Seminar-How The Internet Works",
            Section: "B1",
            instructors: "Staff\n                                             * Hughes, A R",
            Days: "R",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "9:00 AM  -  9:50 AM",
            Type: "REC",
            Class: "24440"
        }, {
            _id: "57e54188304ddf23ffcdc6b0",
            status: "Closed",
            Room: "Norton 209",
            Title: "Ub Seminar-How The Internet Works",
            Section: "B2",
            instructors: "Staff\n                                             * Hughes, A R",
            Days: "R",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "10:00 AM  -  10:50 AM",
            Type: "REC",
            Class: "24445"
        }, {
            _id: "57e54188304ddf23ffcdc6b1",
            status: "Closed",
            Room: "Alumni 88",
            Title: "Ub Seminar-How The Internet Works",
            Section: "B4",
            instructors: "*  Winikus, J",
            Days: "R",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "12:00 PM  -  12:50 PM",
            Type: "REC",
            Class: "24447"
        }, {
            _id: "57e54188304ddf23ffcdc6b2",
            status: "Open w/ Reserves",
            Room: "Davis 338A",
            Title: "Ub Seminar",
            Section: "B5",
            instructors: "Staff\n                                             * Qiao, C",
            Days: "F",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "10:00 AM  -  10:50 AM",
            Type: "REC",
            Class: "25695"
        }, {
            _id: "57e54188304ddf23ffcdc6b5",
            status: "Closed",
            Room: "Norton 209",
            Title: "Ub Seminar-How The Internet Works",
            Section: "C2",
            instructors: "Staff\n                                             * Hughes, A R",
            Days: "F",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "11:00 AM  -  11:50 AM",
            Type: "REC",
            Class: "24448"
        }, {
            _id: "57e54188304ddf23ffcdc6b6",
            status: "Closed",
            Room: "Talbrt 111",
            Title: "Ub Seminar-How The Internet Works",
            Section: "C3",
            instructors: "Staff\n                                             * Hughes, A R",
            Days: "R",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "1:00 PM  -  1:50 PM",
            Type: "REC",
            Class: "24449"
        }, {
            _id: "57e54188304ddf23ffcdc6b4",
            status: "Closed",
            Room: "Davis 113A",
            Title: "Ub Seminar-How The Internet Works",
            Section: "C1",
            instructors: "Staff\n                                             * Hughes, A R",
            Days: "F",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "12:00 PM  -  12:50 PM",
            Type: "REC",
            Class: "24439"
        }, {
            _id: "57e54188304ddf23ffcdc6b7",
            status: "Closed",
            Room: "Baldy 109",
            Title: "Ub Seminar-How The Internet Works",
            Section: "C4",
            instructors: "Staff\n                                             * Hughes, A R",
            Days: "R",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "2:00 PM  -  2:50 PM",
            Type: "REC",
            Class: "24450"
        }, {
            _id: "57e54188304ddf23ffcdc6b3",
            status: "Closed",
            Room: "Nsc 210",
            Title: "Ub Seminar-How The Internet Works",
            Section: "C",
            instructors: "*  Winikus, J",
            Days: "M W",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "4:00 PM  -  4:50 PM",
            Type: "SEM",
            Class: "<<<  >>>"
        }, {
            _id: "57e54188304ddf23ffcdc6b8",
            status: "Open",
            Room: "Alumni 97",
            Title: "Ub Seminar-How The Internet Works",
            Section: "D",
            instructors: "*  Hughes, A R",
            Days: "M W",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "9:00 AM  -  9:50 AM",
            Type: "SEM",
            Class: "<<<  >>>"
        }, {
            _id: "57e54188304ddf23ffcdc6b9",
            status: "Open",
            Room: "Clemen 103",
            Title: "Ub Seminar-How The Internet Works",
            Section: "D1",
            instructors: "Staff",
            Days: "T",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "8:00 AM  -  8:50 AM",
            Type: "REC",
            Class: "25331"
        }, {
            _id: "57e54188304ddf23ffcdc6bb",
            status: "Open w/ Reserves",
            Room: "Clemen 103",
            Title: "Ub Seminar-How The Internet Works",
            Section: "D3",
            instructors: "Staff",
            Days: "T",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "3:00 PM  -  3:50 PM",
            Type: "REC",
            Class: "25333"
        }, {
            _id: "57e54188304ddf23ffcdc6ba",
            status: "Open w/ Reserves",
            Room: "Park 146",
            Title: "Ub Seminar-How The Internet Works",
            Section: "D2",
            instructors: "Staff",
            Days: "T",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "5:00 PM  -  5:50 PM",
            Type: "REC",
            Class: "25332"
        }, {
            _id: "57e54188304ddf23ffcdc6bc",
            status: "Open w/ Reserves",
            Room: "Alumni 88",
            Title: "Ub Seminar-How The Internet Works",
            Section: "D4",
            instructors: "Staff",
            Days: "T",
            Course: "CSE 199SR",
            Location: "North Campus",
            Time: "4:00 PM  -  4:50 PM",
            Type: "REC",
            Class: "25334"
        } ]
    };
});

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
        main: '    <div class="sublist_main"  style="overflow-y:scroll;height: 98%;margin-top: 1%;">    <div class=" list-block">    </div>    </div>',
        course: '    <% for(var i = 0,item ; item = CourseList[i]; i++){%>    <div>        <div class="sub_main_tag">            &nbsp;<%if(item.open==false){%><a href="#" coursename="<%=item.Course.replace(/\s+/g, \'\')%>" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>              <%}else{%><a href="#" coursename="<%=item.Course.replace(/\s+/g, \'\')%>" class="dropdown-toggle tag_open" data-action = "drop_up" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a><%}%>            &nbsp;<%=item.Course%>&nbsp;&nbsp;<%=item.Title%>&nbsp;            &nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>        </div>        <div class="tag_list">        </div>    </div>    <%}%>',
        subcourse: '        <% for(var d = 0,it ; it = TagList[d]; d++){%>        <div class="subtag">            <a class="detail_link" data-action="show_details" style="color: #ffffff">            <div class="info_block" courseData =\'<%=JSON.stringify(it)%> \'style="float:left;width:90%"  >                <span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>&nbsp;<%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;&nbsp;(&nbsp;<%=it.Location%>&nbsp;)                <div style=" border-top: 2px solid #eee;"></div>                <span class="fui-time" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>&nbsp;<%=it.Days%>&nbsp;<%=it.Time%>&nbsp;                &nbsp;<span class="fui-location" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.Room%>&nbsp;                &nbsp;<span class="fui-user" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.instructors%>&nbsp;            </div>            </a>            <div style="float: right;background-color: #2980b9;border-top-right-radius: 6px;border-bottom-right-radius: 6px;" >                <a class="checkbox_for_add_course" name="<%=it.Course%>" section = "<%=it.Section%>" data-action="add_course" style="width:60px"><span class="fui-check" style="color:#eff0f2;"></span></a>            </div>        </div>        <%}%>    <div id="course_detail" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">        <div  class="modal-dialog modal-lg" style="background-color: #ffffff;border-radius: 6px;">            <div class="modal-header" style="background-color: #34495e;">                <a type="button" class="close details_button" data-dismiss="modal" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>                <p style="margin-bottom:auto;color: #eff0f2;"><b>Course Detail</b></p>            </div>            <div class="modal-body" id="detail_box" style="height: 600px;max-height:  600px;overflow-y: auto;">            </div>            <div class="modal-footer modal_background_color">                <button type="button" class="btn btn-warning btn-lg details_button" style="float: left;" data-action="comments_window" >Have some words?</button>                <button type="button" class="btn btn-primary btn-lg details_button" data-dismiss="modal" >OK</button>            </div>        </div>    </div>    <div id="comment_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">        <div  class="modal-dialog modal-lg" style="background-color: #ffffff;border-radius: 6px;">            <div class="modal-header" style="background-color: #34495e;">                <a type="button" class="close " data-dismiss="modal" data-action="close_comment" style="padding-top:4px;"><span class="fui-cross" style="color: #eff0f2;"></span></a>                <p style="margin-bottom:auto;color: #eff0f2;"><b>Comments</b></p>            </div>            <div class="modal-body"  style="height: 200px;max-height:  200px;overflow-y: auto;">                <textarea class="form-control" id="comment_Textarea" rows="5" spellcheck="true" style="z-index: auto; position: relative; line-height: 20px; font-size: 16px; transition: none; background: none 0% 0% / auto repeat scroll padding-box padding-box rgb(255, 255, 255);">                </textarea>            </div>            <div class="modal-footer modal_background_color">                <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal" data-action="submit_comment">OK</button>                <button type="button" class="btn btn-warning btn-lg" data-dismiss="modal"  data-action="close_comment" >Close</button>            </div>        </div>    </div>',
        rec: '    <div class="sub_main_tag">        &nbsp;Select the recitation/lab to finish enrollment!    </div>    <% for(var d = 0,it ; it = RecList[d]; d++){%>    <div class="subtag">        <div class="rec_block" courseData =\'<%=JSON.stringify(it)%> \'style="float:left;width:90%"  >            <span class="fui-credit-card" style="padding: 5px;color:#eff0f2;"></span>&nbsp;<%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;&nbsp;(&nbsp;<%=it.Location%>&nbsp;)            <div style=" border-top: 2px solid #eee;"></div>            <span class="fui-time" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;"></span>&nbsp;<%=it.Days%>&nbsp;<%=it.Time%>&nbsp;            &nbsp;<span class="fui-location" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.Room%>&nbsp;            &nbsp;<span class="fui-user" style="padding: 5px;color:#eff0f2;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.instructors%>&nbsp;        </div>        <div style="float: right;background-color: #16a085;border-top-right-radius: 6px;border-bottom-right-radius: 6px;" >            <a class="checkbox_for_add_rec" data-action="add_rec" style="width:60px"><span class="fui-check" style="color:#eff0f2;"></span></a>        </div>    </div>    <%}%>',
        detail: '    <div  style="background-color: #eff0f2;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;">        <div class="Uheader" style=" background-color: #34495e">            <p class="sub_Uheader">                <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;">                </span> &nbsp;Basic Infomation &nbsp; </p>        </div>        <div class="sub_list" style="background-color:#eff0f2;height: 70%; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">            <div class="sublist_main" style="overflow-y:scroll;height: 98%;margin-top: 2%; padding-bottom: 10px;">                <div class=" list-block" style="color:#34495e">                    <form>                        <div class="col-1-s">                            <b>&nbsp;Course Title:&nbsp;</b> <b style="color:#1abc9c"><%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;</b>                        </div>                        <div class="col-3-s">                            <b>&nbsp;Location:&nbsp;</b> <b style="color:#1abc9c"><%=it.Location%></b>                        </div>                        <div class="col-3-s">                            <b>&nbsp;Days:&nbsp;</b> <b style="color:#1abc9c"><%=it.Days%></b>                        </div>                        <div class="col-3-s">                            <b>&nbsp;Time:&nbsp;</b> <b style="color:#1abc9c"><%=it.Time%></b>                        </div>                        <div class="col-3-s">                            <b>&nbsp;Room:&nbsp;</b> <b style="color:#1abc9c"><%=it.Room%></b>                        </div>                        <div class="col-3-s">                            <b>&nbsp;Instructor:&nbsp;</b> <b style="color:#1abc9c"><%=it.instructors%></b>                        </div>                        <div class="col-1-s">                            <b>&nbsp;Other course taught by:&nbsp;</b><b style="color:#1abc9c"><%=it.instructors%></b>                        </div>                    </form>                </div>            </div>        </div>    </div>    <div  style="background-color: #eff0f2;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;margin-top: 1%">        <div class="Uheader" style=" background-color: #34495e">            <p class="sub_Uheader">                <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;">                </span> &nbsp;Course Description &nbsp; </p>        </div>        <div class="sub_list" style="background-color:#eff0f2;height: 70%;border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">            <div class="sublist_main" style="overflow-y:scroll;height: 98%;margin-top: 1%;">                <div class=" list-block" style="color:#34495e">                    <p style="margin:10px;text-align: justify;font-weight: 600"><%=it.Course_Description%></p>    </div>            </div>        </div>    </div>    <div  style="background-color: #eff0f2;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;margin-top: 1%">        <div class="Uheader" style=" background-color: #34495e">            <p class="sub_Uheader" style="margin-bottom: 0px">                <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;">                </span> &nbsp; Student comments &nbsp; <a data-action="open_student_comments" class="open details_button" style="float:right;"><span class="fui-resize" style="padding: 2px;"></span></a></p>        </div>        <div class="sub_list" style="background-color:#eff0f2;height: 70%;border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">            <div class="sublist_main" style="overflow-y:scroll;height: 98%;margin-top: 1%;">                <div class=" list-block" id="comment_list" style="color:#34495e"></div>            </div>        </div>    </div>',
        comment: '    <% for(var d = 0,temp ; temp = CommentList[d]; d++){%>    <div class="comment_block" style="text-align: justify;">        <span class="fui-radio-checked" style="font-size: 18px; float:left; padding-left: 5px;"></span>        <p style="margin:30px;font-weight: 600"> " <%=temp.comments%> "        </p>        <p style="text-align: right;margin: 20px;font-weight: 800"> ----- <%=temp.username%>, <%=temp.updateAt%>        </p>    </div>    <%}%>'
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
        var sig = DataParse(data);
        if (CourseList.length == 0 || sig == false) {
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
        var haveCourse = false;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (!subList.hasOwnProperty(item.Course.replace(/\s+/g, ""))) {
                /*only have this course in database*/
                var it = {
                    Course: item.Course,
                    Title: item.Title,
                    open: false,
                    data: item
                };
                subList[item.Course.replace(/\s+/g, "")] = [];
                CourseList.push(it);
            }
            if (haveCourse == false) {
                haveCourse = SignIn(item);
            } else {
                SignIn(item);
            }
        }
        return haveCourse;
    };
    var SignIn = function(element) {
        /*check single elemnt*/
        defaultSection = "";
        var Signal = false;
        var name = element.Course.replace(/\s+/g, "");
        if (element.Type == "LAB" || element.Type == "LEC" || element.Type == "SEM" || element.Type == "TUT") {
            subList[name].push(element);
            Signal = true;
        } else if (element.Type == "REC") {
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
        return Signal;
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
            if (section != "000" && section.length > 1) {
                $(".list-block").html('<div class="sub_success" style="margin-top: 15%"><div style="text-align: center"><img src="img/icons/svg/retina.svg" alt="Retina"></div> <h5 style="color: #34495e; text-align: center"> Course already added into your course list</h5><hr style="width: 100%; margin: auto;border-top: 1px solid #34495e;"><p style="color: #34495e; text-align: center"> Start new search to add more course</p></div>');
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
        },
        del_course_span: function(tar) {
            $(tar).parent().parent().html("");
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
