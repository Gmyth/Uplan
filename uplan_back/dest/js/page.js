/**
 *	config.js
 *	author：liamhuang
 *	date：20150720
 *
 **/
define("page/controller/config", [], function(require, exports, module) {
    exports.map = {
        flow: "page/flow/index",
        sublist: "page/sublist/index",
        search: "page/search/index"
    };
});

/**
 * Created by Haoyu Guo on 2016/9/3.
 */
define("page/controller/module", [ "page/controller/config", "lib/jquery" ], function(require, exports, module) {
    var tabMap = require("page/controller/config").map;
    var $ = require("lib/jquery");
    var curTab = "flow";
    /*从url获取tab信息*/
    var getTabFromHash = function() {
        var tempurl = location.hash;
        var hash;
        hash = !location.hash ? "#metric" : location.hash;
        return hash.substring(1, hash.length);
    };
    //init function to start load js
    exports.init = function(username, namespace) {
        // for the tab part may need in future
        // curTab = getTabFromHash();
        // curUser   = username;
        // curNs     = namespace||"";
        // var target    = tabMap[ curTab ];
        // require.async( target , function( index ){
        //     index.init();
        // });
        require.async(tabMap["flow"], function(index) {
            index.init();
        });
        require.async(tabMap["sublist"], function(index) {
            index.init();
        });
        require.async(tabMap["search"], function(index) {
            index.init();
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
define("page/flow/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data.Course;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var dataArr = [];
    /*2D array*/
    var tmpl = {
        main: '    <div class="main_header">        <table  class= "weekly_schedule table-bordered table-hover table-responsive" cellspacing="0" cellpadding="2" width="100%" >            <colgroup span="1" width="9%" align="center" valign="middle"></colgroup>            <colgroup span="7" width="13%" align="center" valign="middle"></colgroup>            <thead>            <th>Time</th>            <th>Monday<br>Sep 5</th>            <th>Tuesday<br>Sep 6</th>            <th>Wednesday<br>Sep 7</th>            <th>Thursday<br>Sep 8</th>            <th>Friday<br>Sep 9</th>            <th>Saturday<br>Sep 10</th>            <th>Sunday<br>Sep 11</th>            </thead>            <tbody id="flow_body">            </tbody>        </table>    <!-- End HTML Area -->    </div>',
        body: '    <%for(var i=0,item;item = CourseList[i];i++){%>    <tr>    <%if(i%2==0){%><td class="weekly_schedule_time_background" rowspan="2"><span ><%=startTime+(i/2)%>:00</span></td><%}%>        <%if(typeof item[0] == "object" && item[0]){%>        <%if(item[0].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>        <%}else{%>        <%if(item[0].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[0].span%> ><span><%=item[0].Course%>  - <%=item[0].Section%><br><%=item[0].Type%><br><%=item[0].Time%><br><%=item[0].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[0]!= "boolean"&&item[0] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[1] == "object" && item[1]){%>        <%if(item[1].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>        <%}else{%>        <%if(item[1].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[1].span%> ><span><%=item[1].Course%>  - <%=item[1].Section%><br><%=item[1].Type%><br><%=item[1].Time%><br><%=item[1].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[1]!= "boolean"&&item[1] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[2] == "object" && item[2]){%>        <%if(item[2].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>        <%}else{%>        <%if(item[2].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[2].span%> ><span><%=item[2].Course%>  - <%=item[2].Section%><br><%=item[2].Type%><br><%=item[2].Time%><br><%=item[2].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[2]!= "boolean"&&item[2] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[3] == "object" && item[3]){%>        <%if(item[3].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>        <%}else{%>        <%if(item[3].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[3].span%> ><span><%=item[3].Course%>  - <%=item[3].Section%><br><%=item[3].Type%><br><%=item[3].Time%><br><%=item[3].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[3]!= "boolean"&&item[3] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[4] == "object" && item[4]){%>        <%if(item[4].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>        <%}else{%>        <%if(item[4].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[4].span%> ><span><%=item[4].Course%>  - <%=item[4].Section%><br><%=item[4].Type%><br><%=item[4].Time%><br><%=item[4].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[4]!= "boolean"&&item[4] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[5] == "object" && item[5]){%>        <%if(item[5].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>        <%}else{%>        <%if(item[5].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[5].span%> ><span><%=item[5].Course%>  - <%=item[5].Section%><br><%=item[5].Type%><br><%=item[5].Time%><br><%=item[5].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[5]!= "boolean"&&item[5] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>        <%if(typeof item[6] == "object" && item[6]){%>        <%if(item[6].hasOwnProperty("hover")){%>        <td class="weekly_schedule_line_background_hovered" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>        <%}else{%>        <%if(item[6].hasOwnProperty("conflict")){%>        <td class="weekly_schedule_line_background_conflict" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>        <%}else{%>        <td class="weekly_schedule_line_background" rowspan=<%=item[6].span%> ><span><%=item[6].Course%>  - <%=item[6].Section%><br><%=item[6].Type%><br><%=item[6].Time%><br><%=item[6].Room%></span></td>        <%}%>        <%}%>        <%}else if(typeof item[6]!= "boolean"&&item[6] != "hover_item"){%><td class="weekly_schedule_line">&nbsp;</td><%}%>    </tr>    <%}%>'
    };
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function() {
        $(".main_container").html(tpl.get(tmpl.main));
        var container_height = $(".main_container").height();
        $(".main_body").height(container_height - 60);
        $(".main_body").css("max-height", container_height - 60);
        // $('#flow_body').html(tpl.get(tmpl.test,{'startTime':timeStart,'CourseList':dataArr}));
        FillFlow();
        /*Data already added in global dadaArr*/
        $("#flow_body").html(tpl.get(tmpl.body, {
            startTime: timeStart,
            CourseList: dataArr
        }));
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
            config.push(NewC);
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
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".main_container");
        $main.off();
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
 * Created by kaiyu on 9/26/16.
 */
define("page/search/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser", "net/search" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var search = require("net/search");
    var tmpl = {
        main: '    <ul style="list-style-type:none; font-size: small;">        <li style="color:white">Subject            <input type="text" id="txtsubject" class="form-control input-s" placeholder="Enter here"/>        </li>        <li style="color:white">Course Number            <select id="selnumber" class="form-control1 select1 select-primary select-block">                <optgroup label="course number">                    <option value="0">is exactly</option>                    <option value="1">greater than</option>                    <option value="2">less or equal</option>                </optgroup>            </select>            <input type="text" id="txtnumber" class="form-control input-s" placeholder="Enter here"/>        </li>        <li>            <a data-toggle="modal" class="hoverable" data-target=".bd-example-modal-sm">advanced option</a>            <button class="btn1 btn-default btn1-wide1" value="search" data-action="storedata">search</button>        </li>    </ul>    <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"         aria-hidden="true">        <div class="modal-dialog modal-sm">            <div class="modal-header modal_width modal_background_color">                <p style="text-align:center; margin-bottom:auto"><b>advanced search option</b></p>            </div>            <div class="modal-body modal_width modal_background_color">                <div>                    <ul style="list-style-type:none">                        <li><b style="position:relative; top: 5px" ;>Course Career</b>                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp                            <select id="sellevel" class="form-control1 select1 select-primary select-block">                                <optgroup label="course career">                                    <option value="0">undergraduate</option>                                    <option value="1">graduate</option>                                </optgroup>                            </select>                        </li>                        <li>                            <div class="span">                                <label1 class="checkbox1" for="checkbox1">                                    <input style="margin-right: 5px;" type="checkbox" value="checked"                                           id="checkbox1">                                    <b>Show Open Classes Only</b>                                </label1>                            </div>                        </li>                        <li><b>Meeting Start Time</b>                            <select id="selstart" class="form-control1 select1 select-primary select-block">                                <optgroup label="meeting start time">                                    <option value="0">is exactly</option>                                    <option value="1">greater than</option>                                    <option value="2">less than</option>                                </optgroup>                            </select>                            <input type="text" id="txtstarttime" class="form-control input-s"                                   placeholder="Enter here"/>                        </li>                        <li><b>Meeting End Time</b>                            &nbsp&nbsp                            <select id="selend" class="form-control1 select1 select-primary select-block">                                <optgroup label="meeting end time">                                    <option value="0">is exactly</option>                                    <option value="1">greater than</option>                                    <option value="2">less than</option>                                </optgroup>                            </select>                            <input type="text" id="txtendtime" class="form-control input-s"                                   placeholder="Enter here"/>                        </li>                        <li><b>Course Credits</b>                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp                            <select id="selcredit" class="form-control1 select1 select-primary select-block">                                <optgroup label="course credit">                                    <option value="0">is exactly</option>                                    <option value="1">greater than</option>                                    <option value="2">less than</option>                                </optgroup>                            </select>                            <input type="text" id="txtcredit" class="form-control input-s"                                   placeholder="Enter here"/>                        </li>                    </ul>                </div>            </div>            <div class="modal-footer modal_width modal_background_color">                <button type="button" class="btn1 btn-default btn1-wide2" data-dismiss="modal">Close</button>                <button type="button" class="btn1 btn-default btn1-wide2">Save changes</button>            </div>        </div>    </div>'
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
        storedata: function(tar) {
            var input_subject = $("#txtsubject").val();
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
                selnum: input_select_number=='0'?"1":"2",
                selllevel: input_select_level,
                check_box_id1: input_open == undefined ? "0" : "1",
                txtstarttime: input_starttime,
                txtendtime: input_endtime
            };
            $.ajax({
                method: "GET",
                url: "./get_courses_info",
                data: Obj
            }).done(function(data) {
                var flow = require('page/sublist/index');
                flow.ShowCourse(data);
            });
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".search_sub_box");
        $main.off();
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
define("page/sublist/index", [ "lib/jquery", "page/sublist/config", "util/tpl", "util/timeparser", "page/flow/index", "page/flow/config" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/sublist/config").data.Course;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var flow = require("page/flow/index");
    var timeStart = 8;
    var timeEnd = 21;
    var CourseList = [];
    var subList = {};
    var sectionList = {};
    var tmpl = {
        main: '    <div class="sublist_main"  style="overflow-y:scroll;height: 98%;margin-top: 1%;">    <div class=" list-block">    </div>    </div>',
        course: '    <% for(var i = 0,item ; item = CourseList[i]; i++){%>    <div>        <div class="sub_main_tag">            &nbsp;<%if(item.open==false){%><a href="#" coursename="<%=item.Course.replace(/\s+/g, \'\')%>" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>              <%}else{%><a href="#" coursename="<%=item.Course.replace(/\s+/g, \'\')%>" class="dropdown-toggle tag_open" data-action = "drop_up" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a><%}%>            &nbsp;<%=item.Course%>&nbsp;&nbsp;<%=item.Title%>&nbsp;            &nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>        </div>        <div class="tag_list">        </div>    </div>    <%}%>',
        subcourse: '        <% for(var d = 0,it ; it = TagList[d]; d++){%>        <div class="subtag">            <div class="info_block" courseData =\'<%=JSON.stringify(it)%> \'style="float:left;width:90%"  >                <span class="fui-credit-card" style="padding: 5px;color:#dfce8b;"></span>&nbsp;<%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;&nbsp;(&nbsp;<%=it.Location%>&nbsp;)                <div style=" border-top: 2px solid #eee;"></div>                <span class="fui-time" style="padding: 5px;color:#efa59d;position: relative;top: 1px;"></span>&nbsp;<%=it.Days%>&nbsp;<%=it.Time%>&nbsp;                &nbsp;<span class="fui-location" style="padding: 5px;color:#edad73;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.Room%>&nbsp;                &nbsp;<span class="fui-user" style="padding: 5px;color:#27ae60;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.instructors%>&nbsp;            </div>            <div style="float: right;background-color: rgba(60, 162, 199, 0.4);" >                <a class="checkbox_for_add_course" name="<%=it.Course%>" section = "<%=it.Section%>" data-action="add_course" style="width:60px"><span class="fui-check"></span></a>            </div>        </div>        <%}%>',
        rec: '    <% for(var d = 0,it ; it = RecList[d]; d++){%>    <div class="subtag">        <div class="info_block" courseData =\'<%=JSON.stringify(it)%> \'style="float:left;width:90%"  >            <span class="fui-credit-card" style="padding: 5px;color:#dfce8b;"></span>&nbsp;<%=it.Title%>&nbsp;<%=it.Type%>&nbsp;<%=it.Section%>&nbsp;&nbsp;(&nbsp;<%=it.Location%>&nbsp;)            <div style=" border-top: 2px solid #eee;"></div>            <span class="fui-time" style="padding: 5px;color:#efa59d;position: relative;top: 1px;"></span>&nbsp;<%=it.Days%>&nbsp;<%=it.Time%>&nbsp;            &nbsp;<span class="fui-location" style="padding: 5px;color:#edad73;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.Room%>&nbsp;            &nbsp;<span class="fui-user" style="padding: 5px;color:#27ae60;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=it.instructors%>&nbsp;        </div>        <div style="float: right;background-color: rgba(60, 162, 199, 0.4);" >            <a class="checkbox_for_add_course" data-action="add_rec" style="width:60px"><span class="fui-check"></span></a>        </div>    </div>    <%}%>'
    };
    exports.init = function() {
        $(".sub_list").html(tpl.get(tmpl.main));
        //ShowCourse();
        _bindEvent();
    };
    exports.ShowCourse = function(data) {
        DataParse(data);
        $(".list-block").html(tpl.get(tmpl.course, {
            CourseList: CourseList
        }));
    };
    var DataParse = function(data) {
        CourseList = [];
        subList = {};
        sectionList = {};
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
        var name = element.Course.replace(/\s+/g, "");
        if (element.Type == "LEC" || element.Type == "SEM" || element.Type == "TUT") {
            subList[name].push(element);
        } else if (element.Type == "LAB" || element.Type == "REC") {
            var Section = element.Section.replace(/[0-9]/g, "");
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
    var Resize = function() {
        $(".subtag").each(function(index, value) {
            var width = $(this).width();
            $(this).find(".info_block").width(width - 60);
            var checkbox_width = (56 - $(this).find(".checkbox_for_add_course").width()) / 2;
            var checkbox_height = ($(this).find(".info_block").height() + 6 - $(this).find(".checkbox_for_add_course").height()) / 2;
            $(this).find(".checkbox_for_add_course").attr("style", "display:block;padding-left:" + checkbox_width + "px;" + "padding-right: " + checkbox_width + "px;" + "padding-top: " + checkbox_height + "px;" + "padding-bottom: " + checkbox_height + "px;");
        });
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
                var item = JSON.parse($(this).attr("courseData"));
                flow.update(item, false);
            }, function() {
                flow.update();
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
            var info = $(tar).parent().parent().children().first().attr("courseData");
            var item = JSON.parse(info);
            var coursename = $(tar).attr("name").replace(/\s+/g, "");
            var section = $(tar).attr("section");
            if (sectionList[coursename] != null) {
                var list = sectionList[coursename][section];
                $(".list-block").html(tpl.get(tmpl.rec, {
                    RecList: list
                }));
                Resize();
                Resize();
            }
            flow.update(item, true);
        },
        add_rec: function(tar) {
            var info = $(tar).parent().parent().children().first().attr("courseData");
            var item = JSON.parse(info);
            flow.update(item, true);
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $sub_list = $(".sub_list");
        $sub_list.off();
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
        });
    };
});
