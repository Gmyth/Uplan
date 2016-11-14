/**
 * Created by Haoyu Guo on 2016/9/3.
 */
define(function(require, exports, module){
    var tabMap    = require("page/controller/config").map;
    var $ = require("lib/jquery");
    var curTab    = "flow";
    /*从url获取tab信息*/
    var getTabFromHash=function(){
        var tempurl=location.hash;
        var hash;
        hash=(!location.hash)?"#metric":location.hash;
        return hash.substring(1,hash.length);
    }
    var showMain = function(){
        $('#welcome_msg').html('')
        $('#welcome_msg').hide();
        $('#sub_box').html(' <div class="search_box"> ' +
            '<div class="Uheader" style="background-color: #34495e"> ' +
            '<p class ="sub_Uheader"> ' +
            '<span class="fui-search" style="color:#1abc9c;position: relative;top: 1px;"></span> &nbsp;Course Search &nbsp; </p> </div>' +
            ' <div class="search_sub_box" ></div></div> ' +
            '<div class="result_box" style="height: 71%;">' +
            ' <div class ="Uheader" style=" background-color: #34495e">' +
            ' <p class="sub_Uheader">' +
            ' <span class="fui-list-numbered" style="color:#1abc9c;position: relative;top: 1px;"></span> &nbsp;Course List &nbsp; </p> </div>' +
            ' <div class="sub_list" style="height: 93%;">' +
            ' </div>' +
            ' </div>');
        require.async( tabMap["flow"] , function( index ){
            index.init(username);
        });
        require.async( tabMap["sublist"] , function( index ){
            index.init();
        });
        require.async( tabMap["search"] , function( index ){
            index.init();
        });
        $('#main_container').fadeIn(1000);
        $('#sub_box').fadeIn(1000);
    }

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
        $('#main_container').hide();
        $('#sub_box').hide();
        $('#welcome_msg').hide();
        $('#welcome_msg').html('<h4 style="color: #FFFFFF; text-align: center">&nbsp;Hello&nbsp;&nbsp;<span style="color: #FFFFFF;">'+username+'</span ></h4>');
        $('#welcome_msg').fadeIn('slow');
        $('#welcome_msg').fadeOut(2000)
        setTimeout(showMain, 2000);
    };
});