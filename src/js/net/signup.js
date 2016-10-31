/**
 * Created by gmyth on 16/10/28.
 */
/**
 *	API FOR SIGNUP
 *	author: Gmyth
 *	date: 20161028
 */
define(function factory( require, exports, module) {

    var $ = require('lib/jquery');
    var net = require('util/net');
    /**
     *    @method SIGNUP
     *    @desc INERT USER INFO INTO DATABASE
     *    @param OBJ
     *    @param callback function
     *    @return
     */
    exports.Signup = function (SignUp_Obj, callback) {
        //var url  = pub.parseUrl("/application/add ");
        var Obj = {
            "email": SignUp_Obj.email,
            "password" : SignUp_Obj.password,
            "name": SignUp_Obj.name,
            "uni": SignUp_Obj.uni,
            "gender": SignUp_Obj.gender,
            "YRS_EXPERIENCE": SignUp_Obj.YRS_EXPERIENCE,
        }
        $.ajax({
            method: "POST",
            url: "./signup",
            data: Obj
        }).done(callback);
    };
});
