/**
 * Created by dylanwang on 16/9/24.
 */
var express =  require('express');
var mongoose = require('mongoose');
var User = require('../models/user.js');

//sign up
exports.showsignup  = function (req,res) {
    res.render('signup', {title: 'register page'});
};
exports.showsignin = function (req, res) {
    res.render('signin', {title:'login page'});
};

exports.signup = function(req,res){
    var _user = req.param('user'); //req.param('user)
    // use findOne method in models. If exists, jump to login page
    User.findOne({name: _user.name}, function (err,user) {
        if(err){
            console.log(err)
        }

        if(user){
            return res.redirect('/signin')
        }
        else{
            user = new User(_user);
            user.save( function (err,user) {
                if(err){
                    console.log(err)
                }
                res.redirect('/')
            })
        }
    })

};

//sign in
exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name:name},function (err,user) {
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup');
            // if the account is not exsit, return back to the signin page
        }
        user.comparePassword(password, function(err, isMatch){
          if(err){
              console.log(err);
          }
          if(isMatch){
              req.session.user = user; // if get matched password then save in to memory
              return res.redirect('/');
          }
          else{
              res.end('<h1>Password is not matched</h1>');
              console.log('Password is not matched');
              return res.redirect('/signin');

          }

        })

    })

};

// logout

exports.logout = function( req, res){
    delete req.session.user;
    res.redirect('/');

};
//userlist
exports.userlist = function (req, res) {
    User.fetch(function (err,users) {
        if (err){
            console.log(err);
        }
        res.render('userlist',{title:'Users',users:users});
    })
};

//midware for user

exports.signinRequired =function (req,res,next) {
    var user = req.session.user;
    if(!user){
        return res.redirect('/signin');
    }
    next()
};
exports.adminRequired = function (req,res,next) {
    var user = req.session.user;
    if(user.role<=5){
        return res.redirect('/signin');
    }
    next();
};