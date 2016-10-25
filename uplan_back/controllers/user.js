/**
 * Created by dylanwang on 16/9/24.
 */
var express =  require('express');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var passport =require('passport');
var crypto = require('crypto');
var async = require('async');
//sign up
/**
 * GET /signup
 * Signup page.
 */
exports.showsignup  = function (req,res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('signup', {title: 'register page'});
};
/**
 * GET /signin
 * Signin page.
 */
exports.showsignin = function (req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('signin', {title: 'signin page'});
};

/**
 * POST /signin
 * Sign in using email/name and password.
 */
exports.postSignin = function (req,res,next) {
    req.assert('password','Password cannnot be blank').notEmpty();
//sign in
//         var _user = req.body.user;
//         var name = _user.name;
//         var password = _user.password;
            var name = req.body.name;
            var password = req.body.password;
            var errors =req.validationError();
            if(errors){
                req.flash('errors',errors);
                return res.redirect('/signin');
            }
            passport.authenticate('local',function (err,user,info) {
                if(err){return next(err)}
                if(!user){
                    req.flash('errors',info);
                    return res.redirect('/login');
                }
                req.logIn(user,function(err){
                    if(err){return next(err);}
                    req.flash('success',{msg:'success log in'});
                    res.redirect(req.session.returnTo ||'/')
                })
            })(req,res,next);

        // User.findOne({name:name},function (err,user) {
        //     if(err){
        //         console.log(err);
        //     }
        //     if(!user){
        //         return res.redirect('/signup');
        //         // if the account is not exsit, return back to the signin page
        //     }
        //     user.comparePassword(password, function(err, isMatch){
        //         if(err){
        //             console.log(err);
        //         }
        //         if(isMatch){
        //             req.session.user = user; // if get matched password then save in to memory
        //             return res.redirect('/');
        //         }
        //         else{
        //             res.end('<h1>Password is not matched</h1>');
        //             console.log('Password is not matched');
        //             return res.redirect('/signin');
        //
        //         }
        //
        //     })
        //
        // })
};
/**
 * GET /logout
 * Log out.
 */

exports.signout = function (req,res) {
    req.logout();
    res.redirect('/');
}

exports.signup = function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    console.log(name);
    User.findOne({name: _user.name},  function(err, user) {
        if (err) {
            console.log(err)
        }

        if (user) {
            return res.redirect('/signin')
        }
        else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }
                //res.redirect(name);
                res.json(user);
            })
        }
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