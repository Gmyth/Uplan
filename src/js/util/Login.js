<<<<<<< HEAD
/**
 * Created by gmyth on 16/10/28.
 */
=======
>>>>>>> common
define(function(require, exports, module){

    var $ = require('lib/jquery');
    var util = require('util/util');
<<<<<<< HEAD
    var pub = require("net/pub");
=======
    var currrent_url  = "localhost:3000/";
    var pub = require('net/pub');
>>>>>>> common
    var Login={
        user:"",
        init:function(){
            var url=location.href,
<<<<<<< HEAD
                Param=["sessionKey","length","lengh","loginParam","ticket"],
=======
                oaParam=["sessionKey","length","loginParam","ticket"],
>>>>>>> common
                needRedirect=0;//由于跳转需要时间，故需要返回

            var removeOaParam=function(){
                var search=location.search;
                for(var i in oaParam){
                    search=util.removeParam(search,oaParam[i]);
                }
                location.search=search;
            };
            var ticket=util.getParam("ticket");
            if(ticket){
<<<<<<< HEAD
                $.cookie("ticket",ticket,{domain:"barad.isd.com"});
=======
>>>>>>> common
                removeOaParam();
            }else{
                ticket=$.cookie("ticket");
                if(!ticket){
<<<<<<< HEAD
                    location.href="http://passport.oa.com/modules/passport/signin.ashx?url="+encodeURIComponent(url);
=======
                    location.href=currrent_url+"login.html";
>>>>>>> common
                    needRedirect=1;
                }
            }
            return needRedirect;
        },
        redirect:function(){
<<<<<<< HEAD
            location.href="http://passport.oa.com/modules/passport/signin.ashx?url="+encodeURIComponent(location.href);
        },
        param:function(){
            var oaTicket=$.cookie("ticket");
            return {type : 'oa',oaTicket:oaTicket || ""};
=======
            location.href=currrent_url+"login.html";
        }, 
        param:function(){
            var u_Ticket=$.cookie("ticket");
            return {type : 'u',u_Ticket:u_Ticket || ""};
>>>>>>> common
        },
        logout:function(){
            var url = location.href;
            util.cookie.del("ticket");
            util.cookie.del("login_user");
<<<<<<< HEAD
            location.href='http://www.oa.com/api/loginout.ashx?ref='+encodeURIComponent(location.href);
        },
        fetchUser:function(fn){
            var me=this;
            pub.getLoginInfo(function(data){
                if(data.errno==0){
                    var temp=data.data;
                    me.user=temp["LoginName"];
                    me._setUser(temp);
                    if(typeof(fn)=="function"){
                        fn(temp);
                    }
                }else{
                    if(data.errno==-511){
                        me.logout();
                    }
                    else {
                        me.redirect();//重定向登录页面
                    }
                }
            });
        },
        _setUser:function(data){
            this._userInfo=data;
        },
        getUserInfo:function(){
            return this._userInfo;
        },
        hasPermission:function(type){
            var me=this,ret=false;
            switch(type){
                case "cat":
                    if($.inArray(me.user,["fonkiechen","loryluo","cloudyang","ownyang","chenkeliu","lijuntan","leelli","hailongli"])>-1){
                        ret=true;
                    }
                    break;
            }
            return ret;
        }
=======
            location.href=currrent_url+"login.html";
        },
        fetchUser:function(fn){
            var me=this;
              pub.getLoginInfo(function(data){
                  if(data.errno==0){
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

    module.exports =Login;

});
