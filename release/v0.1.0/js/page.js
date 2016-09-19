/**
 *	config.js
 *	author：liamhuang
 *	date：20150720
 *
 **/
define("page/controller/config", [], function(require, exports, module) {
    exports.map = {
        flow: "page/flow/index",
        sublist: "page/sublist/index"
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
 * Created by gmyth on 16/9/7.
 * this part is created for the implement of the Search list
 * */
define("page/sublist/index", [ "lib/jquery", "page/flow/config", "util/tpl", "util/timeparser" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var config = require("page/flow/config").data;
    var tpl = require("util/tpl");
    var timeparser = require("util/timeparser");
    var timeStart;
    var timeEnd;
    var tmpl = {
        main: '    <div style=" border-top: 2px solid #eee;"></div>    <div class="sublist_main"  style="overflow-y:scroll; height:100%;">    <div class=" list-block">        <div class="sub_main_tag">          &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>          &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div>        <div class=" list-block">            <div class="sub_main_tag">                &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>                &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;            </div>        </div>        <div class=" list-block">            <div class="sub_main_tag">                &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>                &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;            </div>        </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div><div class=" list-block">        <div class="sub_main_tag">            &nbsp;<a href="#" coursename="CSE 331" class="dropdown-toggle tag_ready" data-action = "drop_down" style="display:inline-block"><b class="caret" style="margin-left: 0px;"></b></a>            &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;        </div>    </div>    </div>'
    };
    exports.init = function() {
        $(".sub_list").html(tpl.get(tmpl.main));
        _bindEvent();
    };
    var FillFlow = function() {
        /*from 8:00 to 21:00*/
        for (var i = timeStart; i < timeEnd - timeStart; i++) {}
    };
    /*the combination of needed action function*/
    var actionList = {
        drop_down: function(tar) {
            $(tar).parent().html('&nbsp;<a href="#" ' + 'coursename="CSE 331" class="tag_open dropdown-toggle"' + ' data-action = "drop_up" style="display:inline-block">' + '<b class="caret" style="margin-left: 0px;"></b>' + "</a> &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;" + "");
        },
        drop_up: function(tar) {
            $(tar).parent().html('&nbsp;<a href="#" ' + 'coursename="CSE 331" class="tag dropdown-toggle tag_ready"' + ' data-action = "drop_down" style="display:inline-block">' + '<b class="caret" style="margin-left: 0px;"></b>' + "</a> &nbsp;CSE  101LLB - Computers: A General Introduction&nbsp;" + "");
        }
    };
    /*bind the button input control event*/
    var _bindEvent = function() {
        $main = $(".sub_list");
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
