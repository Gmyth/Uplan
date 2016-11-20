define(function factory( require, exports, module){

    var $ 			= require('lib/jquery');
    var router 		= require('util/router');
    var cacheData 	= require('util/cacheData');
    var net     	= require('util/net');
    var util     	= require('util/util');


    /**
     *	@method getProfile
     *	@desc 查询详细信息
     *	@param callback function 回调函数
     *	@return
     */
    exports.getProfile = function(callback){
        $.ajax({
            method: "GET",
            url: "./account/profile",
            data: {}
        }).done(callback);
    };

    /**
     *	@method editProfile
     *	@desc 详细信息
     *	@param callback function 回调函数
     *	@return
     */
    exports.editProfile = function(obj,callback){
        var Obj = {
            "name": obj.username,
            "university": obj.university,
            "gender": obj.gender,
            "YRS_EXPERIENCE": obj.YRS_EXPERIENCE,
            "major": obj.major,
            //"name": "haoyuguo",
        }
        $.ajax({
            method: "POST",
            url: "./account/profile",
            data: Obj
        }).done(callback);
    };
});
