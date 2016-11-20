define(function factory( require, exports, module){

    var $ 			= require('lib/jquery');
    var router 		= require('util/router');
    var cacheData 	= require('util/cacheData');
    var net     	= require('util/net');
    var util     	= require('util/util');


    /**
     *	@method getCourseDetail
     *	@desc 查询详细信息
     *	@param callback function 回调函数
     *	@return
     */

    exports.getCourseDetail = function(obj,callback){
        var data ={
            "course_name":obj.Course,
            "section":obj.Section
        };
        var success = function(json){
            callback && callback( json );
        }
        $.ajax({
            method: "GET",
            url: "./account/getcoursedetail",
            data: data
        }).done(success);
    };
    /**
     *	@method getComment
     *	@desc 查询回复
     *	@param callback function 回调函数
     *	@return
     */

    exports.getComment = function(obj,callback){
        var data ={
            "course_id":obj._id,
        };
        var success = function(json){
            callback && callback( json );
        }
        $.ajax({
            method: "GET",
            url: "./account/getcomments",
            data: data
        }).done(success);
    };

    /**
     *	@method addComment
     *	@desc 增加回复
     *	@param callback function 回调函数
     *	@return
     */
    exports.addComment = function(obj,callback){
        var data ={
            "class_id":obj._id,
            "name" : obj.name,
            "comments":obj.comments,
        };
        var success = function(json){
            callback && callback( json );
        }
        $.ajax({
            method: "POST",
            url: "./account/addcomments",
            data: data
        }).done(success);
    };

});
