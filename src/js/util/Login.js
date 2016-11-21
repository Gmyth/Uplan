<<<<<<< HEAD
define("util/Login", [ "lib/jquery", "util/util", "net/pub", "util/router", "util/cacheData", "util/net" ], function(require, exports, module) {
    var $ = require("lib/jquery");
    var util = require("util/util");
    var currrent_url = "localhost:3000/";
    var pub = require("net/pub");
    var Login = {
        user: "",
        init: function() {
            var url = location.href, oaParam = [ "sessionKey", "length", "loginParam", "ticket" ], needRedirect = 0;
            //由于跳转需要时间，故需要返回
            var removeOaParam = function() {
                var search = location.search;
                for (var i in oaParam) {
                    search = util.removeParam(search, oaParam[i]);
=======
define(function(require, exports, module){

    var $ = require('lib/jquery');
    var util = require('util/util');
    var currrent_url  = "http://localhost:3000/";
    var pub = require('net/pub');
    var Login={
        user:"",
        init:function(){
            var url=location.href,
                oaParam=["sessionKey","length","loginParam","u_Ticket"],
                needRedirect=0;//由于跳转需要时间，故需要返回

            var removeOaParam=function(){
                var search=location.search;
                for(var i in oaParam){
                    search=util.removeParam(search,oaParam[i]);
>>>>>>> common
                }
                location.search = search;
            };
<<<<<<< HEAD
            var ticket = util.getParam("ticket");
            if (ticket) {
                removeOaParam();
            } else {
                ticket = $.cookie("ticket");
                if (!ticket) {
                    location.href = currrent_url + "login.html";
                    needRedirect = 1;
=======
            var ticket=util.getParam("u_Ticket");
            if(ticket){
                removeOaParam();
            }else{
                ticket=$.cookie("u_Ticket");
                if(!ticket){
                    location.href=currrent_url+"login.html";
                    needRedirect=1;
>>>>>>> common
                }
            }
            return needRedirect;
        },
<<<<<<< HEAD
        redirect: function() {
            location.href = currrent_url + "login.html";
=======
        redirect:function(){
            location.href=currrent_url+"login.html";
        }, 
        param:function(){
            var u_Ticket=$.cookie("u_Ticket");
            return {type : 'u',u_Ticket:u_Ticket || ""};
>>>>>>> common
        },
        param: function() {
            var u_Ticket = $.cookie("ticket");
            return {
                type: "u",
                u_Ticket: u_Ticket || ""
            };
        },
        logout: function() {
            var url = location.href;
<<<<<<< HEAD
            util.cookie.del("ticket");
            util.cookie.del("login_user");
            location.href = currrent_url + "login.html";
        },
        fetchUser: function(fn) {
            var me = this;
            pub.getLoginInfo(function(data) {
                if (data.errno == 0) {
                    var temp = data.data;
                    me.user = temp["username"];
                    if (typeof fn == "function") {
                        fn(temp);
                    }
                } else {
                    me.redirect();
                }
            });
        }
=======
            util.cookie.del("u_Ticket");
            location.href=currrent_url+"login.html";
        },
        fetchUser:function(fn){
            var me=this;
              pub.getLoginInfo(function(data){
                  if(data.errno=="200"){
                      var temp=data.data;
                      me.user=temp["username"];
                      if(typeof(fn)=="function"){
                          fn(temp);
                      }
                  }else{
                      me.redirect();//重定向登录页面
                  }
               });
        },

>>>>>>> common
    };
    module.exports = Login;
});