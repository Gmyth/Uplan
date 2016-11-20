var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
var mongoose =require('mongoose');
var User = require('../models/user.js');
/* GET users listing. */
var passport =require('../config/passport');
var userController = require('../controllers/user');
var courseController = require('../controllers/courses')
<<<<<<< HEAD
=======

>>>>>>> feature-comments(backend)
//user route

//var xiaoming = new User({name:'Eric1990',password: '1234567', email:'123@hotmail.com'});

//xiaoming.save(function (err) {
//  if (err) // ...
//      console.log('meow');
//});
// router.get('/signup',function (req,res) {
//  res.render('signup', {title: 'register page'});
//  });
/**
 * Primary app routes.
 */
//
// router.get('/', function(request, response) {
//     //var readFile = "/dest/index.html";
//     //var fileContents = fs.readFileSync(readFile);
//
//     response.sendFile('index.html');
// });
router.get('/login',userController.showsignin);
router.post('/login',userController.postSignin);

router.get('/signup',userController.showsignup);
router.post('/signup',userController.postSignup);

router.get('/logout',userController.signout);
/**
 * get profile info. including course info
 * 发包样式: 无
 */

router.get('/account/profile',userController.getAccount);
/**
 * get course taken list and change
 * 发包样式:body 字段名:firstname, lastname, gender, YRS_EXPERIENCE, university
 */

router.post('/account/profile', userController.postUpdateProfile);

/**
 * change course taken list  这是修改/添加上过的课的接口
 * 发包样式:body  变量名 : oldcourse  ===》  把所有用户选的课的id以一个数组的形式封装请求给我
 */

router.post('/account/course_taken', userController.course_taken);
/**
 * change course taking list 这是修改/添加准备要上的课的接口
 * 发包样式:body  变量名 : newcourse  ===》  把所有用户选的课的id以一个数组的形式封装请求给我
 */

router.post('/account/course_taking',userController.course_taking);

/**
<<<<<<< HEAD
 * get course taking list  (building)
 */

router.get('/account/getcoursedetail', courseController.getcoursedetail);

//router.get('/account/getcomments',commentController.getcomments);
//router.post('/account/addcomments,', commentController.postcomment);
=======
 * get course detail
 *
 *param: course_name  -->AAS 270LEC
 *section: MOR
 *
 */

router.get('/account/getcoursedetail', courseController.getcoursedetail);
//
// router.get('/account/getcomments',commentController.getcomments);


/** get comment of course detail method
 * param:  ---- 》course_id :  582f66811df1030480b94662
 *  GET method
 *
 */
router.get('/account/getcomments', courseController.getcoursedetailComment);

/** created comment of course detail method
 * body:     user_id   ===> 58168988bbeb8b14691a2486
 *           class_id  ===> 582f66811df1030480b94667 ( from class_detail)
 *           name      ===> chaojie (user's name)
 *           comments  ===> whatever he/she type
 *  POST method
 *
 */


router.post('/account/addcomments', courseController.postcoursecomment);
>>>>>>> feature-comments(backend)

//router.get('/account/avatar',userController.getAvatar);
//router.post('/account/avatar', userController.postAvatar);









/**
 * OAuth authentication routes. (Sign in)
 */
router.get('/auth/google',passport.authenticate('google',{scope:'profile email'}));
router.get('/auth/google/callback', passport.authenticate('google',{

    failureRedirect: '/signin.html'}),(req,res)=>{
    //console.log(req);
    req.session.sign=true;
    console.log('111111');
    console.log(req.session)
    console.log('qweqweq');
    console.log(res.user);

    //res.json({"error":"","errno":"200","data":""});
    res.redirect( '/')
});
//lll
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
<<<<<<< HEAD
=======

>>>>>>> feature-comments(backend)

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
//git error so recommit test
module.exports = router;
/**
 * Created by dylanwang on 16/10/27.
 */
