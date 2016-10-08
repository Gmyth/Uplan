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
            "class": "<<< >>>",
            course: "CSE 331",
            title: "Intro To Algorihms",
            section: "000",
            type: "LEC",
            days: "M W F",
            time: "1:00PM - 1:50PM",
            room: "KNOX 110",
            Location: "North Campus",
            Instructor: "Rudra Atri",
            Status: "OPEN"
        }, {
            "class": "11748",
            course: "CSE 331LR",
            title: "Intro To Algorihms",
            section: "000",
            type: "R1",
            days: "M",
            time: "9:00AM - 9:50AM",
            room: "Hoch 139",
            Location: "North Campus",
            Instructor: "Staff",
            Status: "OPEN"
        } ]
    };
});

/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Schedule module
 * */
define("page/flow/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var timeStart;
    var timeEnd;
    var tmpl = {
        main: '    <div class="main_header">        <table  class= "weekly_schedule table-bordered table-hover table-responsive" cellspacing="0" cellpadding="2" width="100%" >            <colgroup span="1" width="9%" align="center" valign="middle"></colgroup>            <colgroup span="7" width="13%" align="center" valign="middle"></colgroup>            <thead>            <th>Time</th>            <th>Monday<br>Sep 5</th>            <th>Tuesday<br>Sep 6</th>            <th>Wednesday<br>Sep 7</th>            <th>Thursday<br>Sep 8</th>            <th>Friday<br>Sep 9</th>            <th>Saturday<br>Sep 10</th>            <th>Sunday<br>Sep 11</th>            </thead>            <tbody>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">08:00</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  442LR - B<br>Lecture<br>10:00 - 10:50<br>O\'Brian Hall 109</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  442LR - B2<br>Recitation<br>08:00 - 08:50<br>Cooke Hall 127A</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>            </tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">09:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - R3<br>Recitation<br>09:00 - 09:50<br>Norton Hall 209</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>            </tr>            <tr>                <td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td>            </tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">10:00</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  442LR - B<br>Lecture<br>10:00 - 10:50<br>O\'Brian Hall 109</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  442LR - B<br>Lecture<br>10:00 - 10:50<br>O\'Brian Hall 109</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - R3<br>Recitation<br>09:00 - 09:50<br>Norton Hall 209</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  442LR - B<br>Lecture<br>10:00 - 10:50<br>O\'Brian Hall 109</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>            </tr>            <tr>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">11:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">12:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - R3<br>Recitation<br>09:00 - 09:50<br>Norton Hall 209</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  321LR - 000<br>Lecture<br>12:00 - 12:50<br>Hochstetter Hall 114</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  321LR - 000<br>Lecture<br>12:00 - 12:50<br>Hochstetter Hall 114</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">13:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - 000<br>Lecture<br>13:00 - 13:50<br>Knox Lecture Hall 110</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - 000<br>Lecture<br>13:00 - 13:50<br>Knox Lecture Hall 110</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr>            <tr>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>            </tr>            <tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">14:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>            </tr>            <tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">15:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">JPN  101LEC - E<br>Lecture<br>15:00 - 15:50<br>Baldy Hall 107</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">JPN  101LEC - E<br>Lecture<br>15:00 - 15:50<br>Baldy Hall 107</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">JPN  101LEC - E<br>Lecture<br>15:00 - 15:50<br>Baldy Hall 107</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">JPN  101LEC - E<br>Lecture<br>15:00 - 15:50<br>Baldy Hall 107</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">16:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">17:00</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - R3<br>Recitation<br>09:00 - 09:50<br>Norton Hall 209</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td></tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">18:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td></tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">19:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">20:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">21:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>            </tr>            </tbody>        </table>    <!-- End HTML Area -->    </div>'
    };
    /*config set*/
    var timeStart = 8;
    var timeEnd = 21;
    exports.init = function() {
        $(".main_container").html(tpl.get(tmpl.main));
        var container_height = $(".main_container").height();
        $(".main_body").height(container_height - 60);
        $(".main_body").css("max-height", container_height - 60);
        _bindEvent();
    };
    var windowHeight = function() {
        var de = document.documentElement;
        return self.innerHeight || de && de.clientHeight || document.body.clientHeight;
    };
    var FillFlow = function() {
        /*from 8:00 to 21:00*/
        for (var i = timeStart; i < timeEnd - timeStart; i++) {}
    };
    /*the combination of needed action function*/
    var actionList = {
        start: function(tar) {}
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
define("page/search/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var tmpl = {
        main: '    <ul style="list-style-type:none; font-size: small;">        <li style="color:white">Subject            <input type="text" id="txtsubject" class="form-control input-s" placeholder="Enter here"/>        </li>        <li style="color:white">Course Number            <select id="selnumber" class="form-control1 select1 select-primary select-block">                <optgroup label="course number">                    <option value="0">is exactly</option>                    <option value="1">greater than</option>                    <option value="2">less or equal</option>                </optgroup>            </select>            <input type="text" id="txtnumber" class="form-control input-s" placeholder="Enter here"/>        </li>        <li>            <button type="button" class="btn1 btn-default btn1-wide2" data-toggle="modal"                    data-target=".bd-example-modal-sm">advanced option            </button>            <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"                 aria-hidden="true">                <div class="modal-dialog modal-sm">                    <div class="modal-header modal_width modal_background_color">                        <p style="text-align:center; margin-bottom:auto"><b>advanced search option</b></p>                    </div>                    <div class="modal-body modal_width modal_background_color">                        <div>                            <ul style="list-style-type:none">                                <li><b style="position:relative; top: 5px" ;>Course Career</b>                                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp                                    <select id="sellevel" class="form-control1 select1 select-primary select-block">                                        <optgroup label="course career">                                            <option value="0">undergraduate</option>                                            <option value="1">graduate</option>                                        </optgroup>                                    </select>                                </li>                                <li>                                    <div class="span">                                        <label1 class="checkbox1" for="checkbox1">                                            <input style="margin-right: 5px;" type="checkbox" value="checked"                                                   id="checkbox1">                                            <b>Show Open Classes Only</b>                                        </label1>                                    </div>                                </li>                                <li><b>Meeting Start Time</b>                                    <select id="selstart" class="form-control1 select1 select-primary select-block">                                        <optgroup label="meeting start time">                                            <option value="0">is exactly</option>                                            <option value="1">greater than</option>                                            <option value="2">less than</option>                                        </optgroup>                                    </select>                                    <input type="text" id="txtstarttime" class="form-control input-s"                                           placeholder="Enter here"/>                                </li>                                <li><b>Meeting End Time</b>                                    &nbsp&nbsp                                    <select id="selend" class="form-control1 select1 select-primary select-block">                                        <optgroup label="meeting end time">                                            <option value="0">is exactly</option>                                            <option value="1">greater than</option>                                            <option value="2">less than</option>                                        </optgroup>                                    </select>                                    <input type="text" id="txtendtime" class="form-control input-s"                                           placeholder="Enter here"/>                                </li>                                <li><b>Course Credits</b>                                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp                                    <select id="selcredit" class="form-control1 select1 select-primary select-block">                                        <optgroup label="course credit">                                            <option value="0">is exactly</option>                                            <option value="1">greater than</option>                                            <option value="2">less than</option>                                        </optgroup>                                    </select>                                    <input type="text" id="txtcredit" class="form-control input-s"                                           placeholder="Enter here"/>                                </li>                            </ul>                        </div>                    </div>                    <div class="modal-footer modal_width modal_background_color">                        <button type="button" class="btn1 btn-default btn1-wide2" data-dismiss="modal">Close</button>                        <button type="button" class="btn1 btn-default btn1-wide2">Save changes</button>                    </div>                </div>            </div>            <button class="btn1 btn-default btn1-wide1" value="search" data-action="storedata">                search            </button>    </ul>'
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
            type: " 000-LEC Univ 15 Wk",
            classno: "10894",
            date: "MoWeFr 13:00 - 13:50 ",
            room: "KNOX 110",
            instructor: "Rudra Atri",
            Status: "OPEN"
        }, {
            type: " 000-LEC Univ 15 Wk",
            classno: "10894",
            date: "MoWeFr 13:00 - 13:50 ",
            room: "KNOX 110",
            instructor: "Rudra Atri",
            Status: "OPEN"
        }, {
            type: " 000-LEC Univ 15 Wk",
            classno: "10894",
            date: "MoWeFr 13:00 - 13:50 ",
            room: "KNOX 110",
            instructor: "Rudra Atri",
            Status: "OPEN"
        } ]
    };
});

/**
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Search list
 * */
define("page/sublist/index", [ "lib/jquery", "page/sublist/config", "util/tpl", "util/timeparser" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/sublist/config").data.Course;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var timeStart;
    var timeEnd;
    var tmpl = {
        main: '    <div class="sublist_main"  style="overflow-y:scroll;height: 98%;margin-top: 1%;">    <div class=" list-block">        <div>        <div class="sub_main_tag">          &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>          &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;          &nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>        </div>        <div class="tag_list">        </div>       </div>        <div>            <div class="sub_main_tag">                &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>                &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;                &nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>            </div>            <div class="tag_list">            </div>        </div>    </div>    </div>',
        test: '<b>dada</b>',
        tag: '    <% for(var i = 0,item ; item = TagList[i]; i++){ %>    <div class="subtag">        <div class="info_block" style="float:left;">            <span class="fui-credit-card" style="padding: 5px;color:#dfce8b;"></span>&nbsp;<%=item.type%>&nbsp;&nbsp;(<%=item.classno%>)&nbsp;            <div style=" border-top: 2px solid #eee;"></div>            <span class="fui-time" style="padding: 5px;color:#efa59d;position: relative;top: 1px;"></span>&nbsp;<%=item.date%>&nbsp;            &nbsp;<span class="fui-location" style="padding: 5px;color:#edad73;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=item.room%>&nbsp;            &nbsp;<span class="fui-user" style="padding: 5px;color:#27ae60;position: relative;top: 1px;border-left: 2px solid #eee;"></span>&nbsp;<%=item.instructor%>&nbsp;        </div>        <div style="float: right;background-color: rgba(60, 162, 199, 0.4);" >            <a class="checkbox_for_add_course" data-action="add_course" style="width:60px"><span class="fui-check"></span></a>        </div>    </div>    <%}%>'
    };
    exports.init = function() {
        $(".sub_list").html(tpl.get(tmpl.main));
        _bindEvent();
    };
    var FillFlow = function() {
        /*from 8:00 to 21:00*/
        for (var i = timeStart; i < timeEnd - timeStart; i++) {}
    };
    var Resize = function() {
        var width = $(".subtag").width();
        $(".info_block").width(width - 60);
        var checkbox_height = ($(".info_block").height() + 6 - $(".checkbox_for_add_course").height()) / 2;
        var checkbox_width = (56 - $(".checkbox_for_add_course").width()) / 2;
        $(".checkbox_for_add_course").each(function(index, element) {
            $(this).attr("style", "display:block;padding-left:" + checkbox_width + "px;" + "padding-right: " + checkbox_width + "px;" + "padding-top: " + checkbox_height + "px;" + "padding-bottom: " + checkbox_height + "px;");
        });
    };
    /*the combination of needed action function*/
    var actionList = {
        drop_down: function(tar) {
            // $(tar).parent().parent().children().eq(1).html("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            $(tar).closest(".sub_main_tag").parent().find(".tag_list").html(tpl.get(tmpl.tag, {
                TagList: config
            }));
            $(tar).parent().html('&nbsp;<a href="#" ' + 'coursename="CSE 331" class="tag_open dropdown-toggle"' + ' data-action = "drop_up" style="display:inline-block">' + '<b class="caret" style="margin-left: 0px;"></b>' + "</a> &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;" + '&nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>');
            Resize();
            // first resize can't get right width of lng block
            Resize();
        },
        drop_up: function(tar) {
            $(tar).closest(".sub_main_tag").parent().find(".tag_list").html("");
            $(tar).parent().html('&nbsp;<a href="#" ' + 'coursename="CSE 331" class="tag dropdown-toggle tag_ready"' + ' data-action = "drop_down" style="display:inline-block">' + '<b class="caret" style="margin-left: 0px;"></b>' + "</a> &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;" + '&nbsp;<a href="#" class="del_course_span" data-action = "del_course_span" style="float:right;position: relative;top: 1px;right: 5px;"><span class="fui-cross"></span></a>');
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
