/**
 *	config.js
 *	author：liamhuang
 *	date：20150720
 *
 **/
define("page/controller/config", [], function(require, exports, module) {
    exports.map = {
        flow: "page/flow/index"
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
    //初始化方法，每个都需要
    exports.init = function(username, namespace) {
        //curTab = getTabFromHash();
        curUser = username;
        curNs = namespace || "";
        var target = tabMap[curTab];
        require.async(target, function(index) {
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
        main: '    <div class="main_header">    <table class= "weekly_schedule_header table-hover" cellspacing="0" cellpadding="2" width="100%" >        <colgroup span="1" width="9%" align="center" valign="middle"></colgroup>        <colgroup span="7" width="13%" align="center" valign="middle"></colgroup>        <thead>        <th>Time</th>        <th>Monday<br>Sep 5</th>        <th>Tuesday<br>Sep 6</th>        <th>Wednesday<br>Sep 7</th>        <th>Thursday<br>Sep 8</th>        <th>Friday<br>Sep 9</th>        <th>Saturday<br>Sep 10</th>        <th>Sunday<br>Sep 11</th>        </thead>    </table>    </div>    <div class="main_body">    <table  class= "weekly_schedule table-bordered table-hover" cellspacing="0" cellpadding="2" width="100%"  id="WEEKLY_SCHED_HTMLAREA">            <colgroup span="1" width="9%" align="center" valign="middle"></colgroup>            <colgroup span="7" width="13%" align="center" valign="middle"></colgroup>            <tbody id="flow_body">            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">08:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  442LR - B2<br>Recitation<br>08:00 - 08:50<br>Cooke Hall 127A</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>            </tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">09:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - R3<br>Recitation<br>09:00 - 09:50<br>Norton Hall 209</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>            </tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">10:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  442LR - B<br>Lecture<br>10:00 - 10:50<br>O\'Brian Hall 109</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  442LR - B<br>Lecture<br>10:00 - 10:50<br>O\'Brian Hall 109</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td>            </tr>            <tr>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">11:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">12:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  321LR - 000<br>Lecture<br>12:00 - 12:50<br>Hochstetter Hall 114</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  321LR - 000<br>Lecture<br>12:00 - 12:50<br>Hochstetter Hall 114</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">13:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - 000<br>Lecture<br>13:00 - 13:50<br>Knox Lecture Hall 110</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">CSE  331LR - 000<br>Lecture<br>13:00 - 13:50<br>Knox Lecture Hall 110</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr>            <tr>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>            </tr>            <tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">14:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>            </tr>            <tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">15:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">JPN  101LEC - E<br>Lecture<br>15:00 - 15:50<br>Baldy Hall 107</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">JPN  101LEC - E<br>Lecture<br>15:00 - 15:50<br>Baldy Hall 107</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">JPN  101LEC - E<br>Lecture<br>15:00 - 15:50<br>Baldy Hall 107</span></td>                <td class="SSSWEEKLYBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLY">JPN  101LEC - E<br>Lecture<br>15:00 - 15:50<br>Baldy Hall 107</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">16:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">17:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td></tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">18:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td></tr>            <tr>                <td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">19:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">20:00</span></td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td></tr><tr><td class="SSSWEEKLYTIMEBACKGROUND" rowspan="2"><span class="SSSTEXTWEEKLYTIME">21:00</span></td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td><td class="SSSWEEKLYLTLINE">&nbsp;</td>                <td class="SSSWEEKLYLTLINE">&nbsp;</td></tr><tr><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>                <td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td><td class="PSLEVEL3GRID">&nbsp;</td>            </tr>            </tbody>    </table>    </div>    <!-- End HTML Area -->'
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
    var FillFlow = function() {
        /*from 8:00 to 21:00*/
        for (var i = timeStart; i < timeEnd - timeStart; i++) {}
    };
    /*the combination of needed action function*/
    var actionList = {};
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
        $(window).resize(function() {
            var container_height = $(".main_container").height();
            $(".main_body").height(container_height - 60);
            $(".main_body").css("max-height", container_height - 60);
        });
    };
    var tmpl = {
        main: '    <table>    <thead>        <tr>            <p>Class search<p>        </tr>    </thead>    <tbody id=search_body>        <tr>            <td><p>Subjrect</p></td>            <td><input type="text" class="form-control input-sm" height:60%; placeholder="Enter something" /></td>        </tr>        <tr>            <td><p>Course number</p></td>            <td><select class="form-control select select-primary select-block mbl">                  <optgroup label="course number">                    <option value="0">contains</option>                    <option value="1">greater than or equal to</option>                    <option value="2">is exactly</option>                    <option value="3">less than or equal to</option>                  </optgroup>                </select></td>            <td><input type="text" class="form-control input-sm" placeholder="Enter something" /></td>        </tr>        <tr>            <td><p>Course career</p></td>            <td><select class="form-control select select-primary select-block mbl">                <optgroup label="course career">                <option value="0">graduate</option>                <option value="1">law school</option>                <option value="2">school of dental medicine</option>                <option value="3">school of medicine</option>                <option value="4">school of pharmacy</option>                <option value="5">undergraduate</option>                </optgroup>                </select></td>        </tr>        <tr>            <td></td>            <td><div class="span3">                <label class="checkbox" for="checkbox1">                <input type="checkbox" value="" id="checkbox1">                Show Open Classes Only                </label>                <label class="checkbox" for="checkbox2">                <input type="checkbox" checked="checked" value="" id="checkbox2">                Open Entry/Exit Classes Only                </label>            </div></td>        </tr>    </tbody>    </table>'
    };
    exports.init = function() {
        $(".search_area").html(tpl.get(tmpl.main));
        _bindEvent();
    };
});
