var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
var mongoose =require('mongoose');
var User = require('../models/user.js');
/* GET users listing. */
var passport =require('../config/passport');
var userController = require('../controllers/user');
//user route

//var xiaoming = new User({name:'Eric1990',password: '1234567', email:'123@hotmail.com'});

//xiaoming.save(function (err) {
  //  if (err) // ...
  //      console.log('meow');
//});
// router.get('/signup',function (req,res) {
//  res.render('signup', {title: 'register page'});
//  });//ll
router.get('/signup',userController.showsignup);
router.post('/signup',userController.postSignup);
    // passport.authenticate('local-signup', {
    //     successRedirect : '/profile', // redirect to the secure profile section
    //         failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //         failureFlash : true
    //     // allow flash messages
    //     }));
        // if (err) {
        //     return next(err); // will generate a 500 error
        // }
        // if (user) {
        //     return res.status(409).render('pages/signup', {errMsg: info.errMsg});
        // }
        // req.login(user, function (err) {
        //     if (err) {
        //         console.error(err);
        //         return next(err);
        //     }
        //     res.json(user);
        // })

// router.post('/signup',function(req,res,next){
//     var _user = req.body.user;
//     var name = _user.name;
//     console.log(name);
//     User.findOne({name: _user.name},  function(err, user) {
//         if (err) {
//             console.log(err)
//         }
//
//         if (user) {
//             return res.redirect('/signin')
//         }
//         else {
//             user = new User(_user);
//             user.save(function(err, user) {
//                 if (err) {
//                     console.log(err)
//                 }
//                 //res.redirect(name);
//                 res.json(user);
//             })
//         }
//     })
// });
   // var newUser = new User(_user);
    //var user = req.param('user'); //req.param('user)
    // use findOne method in models. If exists, jump to login page
   // newUser.save(function(err,post){
       // if (err) return next(err);
     //   res.json(post);
    //})
router.get('/signin',userController.showsignin);
router.post('/signin',userController.postSignin);
// router.get('/signin',chechAuthentication, function (req, res) {
//    res.render('signin/:name', {title:'login page'});
//  });

// router.post('/signin', chechAuthentication,function (req, res) {
//     var _user = req.body.user;
//     var name = _user.name;
//     var password = _user.password;
//
//     User.findOne({name:name}).populate('course_taken').exec(function (err,user) {
//         if(err){
//             console.log(err);
//         }
//         if(!user){
//             return res.redirect('/signup');
//             // if the account is not exsit, return back to the signin page
//         }
//         user.comparePassword(password, function(err, isMatch){
//             if(err){
//                 console.log(err);
//             }
//             if(isMatch){
//
//                 res.json(user);
//                  // if get matched password then save in to memory
//
//             }
//             else{
//                 res.end('<h1>Password is not matched</h1>');
//                 console.log('Password is not matched');
//                 return res.redirect('/signin');
//
//             }
//
//         })
//
//     })
//
//
//
// });

// router.post('/signin',function (req,res,next) {
//     passport.authenticate('local',function (err,user,info) {
//         if(err){
//             return next(err);
//         }
//         if(!user){
//             return res.status(409).render('pages/login', {errMsg: info.errMsg});
//         }
//         req.login(user,function (err) {
//             if(err){
//                 console.error(err);
//                 return next(err);
//             }
//             return res.status(200).redirect('/profile');
//
//         })
//
//     })(req,res,next);
// });


function chechAuthentication(req,res,next) {
    if(req.isAuthenticated()){
        next();
    }   else{
        res.redirect("/signin.html");
    }
}

module.exports = router;
