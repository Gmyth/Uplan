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
    //req.assert('password','Password cannnot be blank').notEmpty();
//sign in
//         var _user = req.body.user;
//         var name = _user.name;
//         var password = _user.password;
            var name = req.body.name;
            var password = req.body.password;
            //var errors =req.validationError();

            passport.authenticate('local',function (err,user,info) {
                if(err){return next(err)}
                if(!user){
                    req.flash('errors',info);
                    console.log('111111');
                    return res.redirect('/signin');
                }
                req.logIn(user,function(err){
                    //res.json(user);
                    if(err){return next(err);}

                    req.flash('success',{msg:'success log in'});
                    console.log( req.sessionID);
                    res.redirect('/profile/:'+req.sessionID);

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
};

/**
 * POST /signup
 * create a new local account
 */
exports.postSignup = (req, res, next) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name:req.body.name
    });

    User.findOne({ name: req.body.name }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
            req.flash('errors', { msg: 'Account with that email address already exists.' });
            return res.redirect('/signup');
        }
        user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.json(user);

            });
        });
    });
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