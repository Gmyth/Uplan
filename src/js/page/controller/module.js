/**
 * Created by Haoyu Guo on 2016/9/3.
 */
define(function(require, exports, module){
    var tabMap    = require("page/controller/config").map;
    var tpl = require("util/tpl");
    var $ = require("lib/jquery");
    var bootstrap = require("widget/bootstrap");
    var curTab    = "flow";
    var curUser   = "";
    /*从url获取tab信息*/
    var tmpl = {
        main: MODULE.WELCOME,
        subbox:MODULE.SUBBOX
    }
    var myDays= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var showMain = function(){
        $('#welcome_msg').html('');
        $('#welcome_msg').hide();
        $('#sub_box').html(tpl.get(tmpl.subbox));
        require.async( tabMap["flow"] , function( index ){
            index.init(curUser);
        });
        require.async( tabMap["sublist"] , function( index ){
            index.init(curUser);
        });
        require.async( tabMap["search"] , function( index ){
            index.init(curUser);
        });
        $('#main_container').fadeIn(1000);
        $('#sub_box').fadeIn(1000);
    }
    var showProfile = function(){
        $('#main_container').hide();
        $('#sub_box').hide();
        $('#welcome_msg').html('');
        $('#welcome_msg').hide();
        require.async( tabMap["profile"] , function( index ){
            index.init(curUser);
        });
        $('#profile').fadeIn(1000);
    }
    var actionList = {
        "profile_open": function(tar) {
            // wait for kaiyukang profile
            $('#welcome_msg').fadeOut(1000)
            //showProfile();
             setTimeout(showProfile, 1000);
        },
        "schedule_page": function(tar) {
            $('#welcome_msg').fadeOut(1000)
            setTimeout(showMain, 1000);
        },
        "profile": function (tar) {
            updateProfile();
            _bindEvent();
        },
    };
    //init function to start load js
    exports.init = function( username ){
        // for the tab part may need in future
        // curTab = getTabFromHash();
        // curUser   = username;
        // curNs     = namespace||"";
        // var target    = tabMap[ curTab ];
        // require.async( target , function( index ){
        //     index.init();
        // });
        curUser = username;
        $('#main_container').hide();
        $('#sub_box').hide();
        $('#profile').hide();
        var today=new Date()
        var thisDay=today.getDay()
        thisDay=myDays[thisDay];
        $('#welcome_msg').hide();
        $('#welcome_msg').html(tpl.get(tmpl.main,{"weekday":thisDay,"username":username}));
        $("#logout").click(function() {
            $.ajax({
                method:"GET",
                url:"./logout"
            }).done(function(){
                var util= require("util/util");
                util.cookie.del("u_Ticket");
                location.href="http://uplans.info/login.html"
            });
        });
        _bindEvent();
        $('#welcome_msg').fadeIn('slow');
    };
    var _bindEvent = function() {
        $main = $("#welcome_msg");
        $demo_row = $('#header');
        $main.on("click", "[data-action]", function() {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data("action");
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        });
        $demo_row.on('click', '[data-action]', function () {
            if ($(this).attr("disabled") != "disabled") {
                var actionName = $(this).data('action');
                var action = actionList[actionName];
                var tar = this;
                if ($.isFunction(action)) action(tar);
            }
        })
    };
});