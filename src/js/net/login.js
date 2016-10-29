/**
 * Created by gmyth on 16/10/28.
 */
/**
 *	API FOR LOGIN
 *	author: Gmyth
 *	date: 20161028
 */
define(function factory( require, exports, module) {

    var $ = require('lib/jquery');
    var net = require('util/net');
    /**
     *    @method LOGIN
     *    @desc lOGIN USER INFO INTO DATABASE
     *    @param OBJ
     *    @param callback function
     *    @return
     */
    exports.Login = function (Login_Obj, callback) {
        //var url  = pub.parseUrl("/application/add ");
        var Obj = {
            "email": Login_Obj.email,
            "name": Login_Obj.username,
            "password" : Login_Obj.password,
        }
        $.ajax({
            method: "POST",
            url: "./login",
            data: Obj
        }).done(callback);
    };
});