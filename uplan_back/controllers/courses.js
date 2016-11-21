/**
 * Created by dylanwang on 16/9/27.
 */
var express =  require('express');
var mongoose = require('mongoose');
var Course = require('../models/course_details.js');
var Comments = require('../models/comments');
var User = require('../models/user')

//db.cse_courses.find({Course:{$regex:/CSE.*/i}})
/*
return courses by searching course number
 */
//111//git error so recommit test
//git error so recommit test
exports.list = function (req, res, callback) {
  db.get().collection('cse_courses',function (err,collection) {
      if(err){
          return callback(err);
      }
      var pattern = new RegExp(req.query.q, "i");
      collection.count({"Course": pattern}, function (err, total) {
          collection.find(
              {"Course": pattern}
          ).sort("Section").toArray(function (err,posts) {
              if (err){
                  return callback(err);
              }
              callback(err,posts,total);
          })

      })

  })

};

/** get course detail method
 *  GET method
 *
 */
exports.getcoursedetail = function (req, res, callback) {
     var Class = req.query.course_name;
     var section = req.query.section;
    //var section = req.query.section;
   // var fullname = Class + section;
    Course.find({"Course":Class,"Section":section}, function (err, result) {
            if(err){
                console.log(err);
            }
            if(!result){
               res.json({"error":"no such course not exist","errno":"400","data":""});
            }

            res.json({"error":"Success","errno":"200","data":result});
    })
};
/** get comment of course detail method
 *  GET method
 *
 */
exports.getcoursedetailComment = function (req, res, callback) {
    var Class_id = req.query.course_id;
    //var section = req.query.section;
    Comments.find({"Course_id":Class_id}, function (err, result) {
        if(err){
            console.log(err);
            console.log("330222");
        }
        if(!result){
            console.log("33000");
            res.json({"error":"no such course not exist","errno":"400","data":""});
        }

        res.json({"error":"Success","errno":"200","data":result});
    })
};

/** post comment of course detail method
 *  POST method
 *  --- change or create new comment
 */

exports.postcoursecomment = function (req, res, callback) {
    console.log("11111111");
    var comments = new Comments({
        userprofile: req.session.passport.user,
        username: req.body.name,
        comments: req.body.comments,
        Course_id: req.body.class_id,
        // var section = req.body.section;
    });
    console.log(comments);
    Comments.findOne({"comments": req.body.comments}, function (err, callback) {
        if (err) {
            console.log(err);
        }
        if (callback) {
            console.log('300');
        }

        comments.save((err) => {
            if (err) {

                console.log('300');
            }
                //res.json(user);
                //success
                //res.redirect('/');
                //var id = req.sessionID;
                console.log('300');
                res.json({"error": "", "errno": "200", "data": comments, "sessionId": req.sessionID});
                //
                // User.findOne({_id:name_id},function (err,callback) {
                //
                //
                //
                //
                // })
                // res.json({"error":"","errno":"0","data":id});
            })


        })

    };




//router.get('/courses_search/:name', function (req, res) {
  //  var name =req.body.name;
    //res.render('modules/'+name);
//});