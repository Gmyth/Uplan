define(function factory( require, exports, module){

    var $ 			= require('lib/jquery');
    var router 		= require('util/router');
    var cacheData 	= require('util/cacheData');
    var net     	= require('util/net');
    var util     	= require('util/util');


    /**
     *	@method saveCourse
     *	@desc 保存课表
     *	@param callback function 回调函数
     *	@return
     */

    exports.saveCourse = function(dataarr,callback){
        var data ={
            "newcourse":dataarr
        };
        ;
        var success = function(json){
            callback && callback( json );
        }
        $.ajax({
            method: "POST",
            url: "./account/course_taking",
            data: data
        }).done(callback);
    };

});
