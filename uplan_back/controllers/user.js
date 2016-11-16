/**
 * Created by dylanwang on 16/9/24.
 */
var express =  require('express');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var passport =require('passport');
var passportConfig = require('../config/passport');
var crypto = require('crypto');
var async = require('async');
var session = require('express-session');
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
 * GET /login
 * Signin page.
 */

exports.showsignin = function (req, res) {

    if (req.user) {
        console.log('111111');
        return res.redirect('/');
    }

    res.render('/login.html', {title: 'signin page'});
};


/**
 * POST /login
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

    if (req.session.sign) {//检查用户是否已经登录
        console.log(req.session.user);
        console.log(req.session);//打印session的值
        console.log('has logged in')
        //res.redirect('/profile/:'+req.sessionID);
        res.json({"error":"has logged in.","errno":"302","data":""});
    }else{

            passport.authenticate('local',function (err,user,info) {
                if(err){return next(err)}
                if(!user){
                    //req.flash('errors',info);
                    console.log('111111');
                    //return res.redirect('/signin');
                    res.json({"error":"user not exist.","errno":"1","data":""});
//oo
                }

                req.logIn(user,function(err){
                    //res.json(user);
                    if(err){return next(err);}
                    req.session.sign = true;
                    console.log(session());
                    console.log('first time')
                    //req.flash('success',{msg:'success log in'});
                    console.log( req.sessionID);
                    res.json({"error":"","errno":"0","data":req.sessionID});
                    //res.redirect('/profile/:'+req.sessionID);

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
}};
/**
 * GET /logout
 * Log out.
 */

exports.signout = function (req,res) {
    //req.logout();
    console.log('sign out now...');
    req.session.sign = false;
    //delete req.session.passport;
    var user          = req.user;
    console.log(req.session);
    user.google.token = undefined;
    user.save(function(err) {
        console.log(user, ' has been successfully logged out.');
        res.redirect('/');
    });
    //res.redirect('/');
    //res.json({"error":"","errno":"0","data":"successful log out"});
};

/**
 * POST /signup
 * create a new local account
 */
exports.postSignup = (req, res, next) => {

    if(req.session.sign) {
        console.log(req.session.user);
        console.log(req.session);//打印session的值
        console.log('has logged in');
        res.json({"error":"has logged in.","errno":"302","data":""});
    }
    else {
        console.log(req.body);
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            'profile.university': req.body.uni,
            'profile.yearExperience': req.body.YRS_EXPERIENCE,
            'profile.username': req.body.name,

        });

        User.findOne({name: req.body.name}, function(err, existingUser) {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                //req.flash('errors', {msg: 'Account with that email address already exists.'});
                return res.json({"error":"user exist","errno":"302","data":""});
                //return res.redirect('/signup');
            }
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    //res.json(user);
                    //success
                    //res.redirect('/');
                    var id = req.sessionID

                    res.json({"error":"","errno":"0","data":id});
                });
            });
        });
    }
};

/**
 * POST /account/course
 * Update course information.
 */

// exports.postUpdateCourse = (req, res, next) => {
//     passportConfig.isAuthorized();
//     var courses = req.body.courselist;
//     User.findById(req.user.id, (err, user) => {
//         user.profile.course_taken = courses ||
//     }
//
//
// }


/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
    //req.assert('email', 'Please enter a valid email address.').isEmail();
    //req.sanitize('email').normalizeEmail({ remove_dots: false });

    //const errors = req.validationErrors();
    //
    // if (errors) {
    //     req.flash('errors', errors);
    //     return res.redirect('/account');
    // }
    //passportConfig.isAuthorized();
    User.findById(req.user.id, (err, user) => {
        if (err) { return next(err); }
        //dont need to change email now
        // /user.email = req.body.email || '';
        user.profile.username = req.body.name || '';
        user.profile.gender = req.body.gender || '';
        user.profile.university = req.body.university;
        user.profile.yearExperience = req.body.YRS_EXPERIENCE;
        user.profile.major = req.body.major;
        //user.profile.truename = req.body.firstname + req.body.lastname|| '';
        //user.profile.location = req.body.location || '';
        //user.profile.website = req.body.website || '';
        user.update({'_id':user._id},{profile: true},function(err) {


            if (err) {
                if (err.code === 11000) {
                    //req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    //return res.redirect('/account');
                    res.json({"error":"The email address you have entered is already associated with an account.","errno":"302","data":""});
                }
                return next(err);
            }
            //req.flash('success', { msg: 'Profile information has been updated.' });
            res.json({"error":"","errno":"200","data":user.profile,"sessionId":req.sessionID});
        });
    });
};
/**
 * GET /account/course
 * course page. ---- return a json format user information.
 */

// exports.getAccountCourse = (req, res) => {
//     if(req.session.sign) {
//         console.log(req);
//          = req.sessionID
//     }
//     else {
//
//     }
//
//
// }



/**
 * GET /account/profile
 * Profile page. ---- return a json format user information.
 */
exports.getAccount = (req, res) => {
    // res.render('account/profile', {
    //     title: 'Account Management'
    // });
    if(req.session.sign) {
    console.log(req);
        userid = req.session.passport.user;
        console.log(res.sessionID);
    User.findOne({_id:userid}).populate('course_taken').exec(function (err,user) {
        if(err){
            console.log(err);
        }
        if(!user){
            //return res.redirect('/signup');
            // if the account is not exsit, return back to the signin page
            return res.json({"error":"account not exist","errno":"404","data":""});
        }
        else{
            return res.json({"error":"","errno":"200","data":{'profile':user.profile,"sessionId":req.sessionID}});
        }

    });
        //res.redirect('/account/profile/:' + req.sessionID);
    }
    else{
        console.log('sign in required.');
        res.json({"error":"sign in required.","errno":"401","data":""});
        //res.send(302,'signin required.')
    }
};

/**
 * POST /account/course_taken
 * Profile page. ------change profile info
 */



exports.course_taken = function (req, res) {
    if(req.session.sign){
        console.log(req);
        userid = req.session.passport.user;
        console.log(res.sessionID);
        User.findById(req.user.id, (err, user) => {
            if (err) { return next(err); }
            user.profile.course_taken = req.body.course_taken;
            user.update({'_id':user._id},{profile: true},function(err) {


                if (err) {
                    if (err.code === 11000) {
                        //req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                        //return res.redirect('/account');
                        res.json({"error":"The email address you have entered is already associated with an account.","errno":"302","data":""});
                    }
                    return next(err);
                }
                //req.flash('success', { msg: 'Profile information has been updated.' });
                res.json({"error":"","errno":"200","data":user.profile,"sessionId":req.sessionID});
            });
        })
    }
    else{
        console.log()
    }


}

// logout

// exports.logout = function( req, res){
//     delete req.session.user;
//     res.redirect('/');
//
// };
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
        return res.redirect('/signin.html');
    }
    next()
};
exports.adminRequired = function (req,res,next) {
    var user = req.session.user;
    if(user.role<=5){
        return res.redirect('/signin.html');
    }
    next();
};

//
// function returnMessage(error, errno, data) {
//     var massege = {error:'',errno:'',data:''};
//     massege.error = error,
//     messege.errno = errno,
//     messege.data = data;
//     return meseege
// }