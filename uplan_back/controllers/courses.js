/**
 * Created by dylanwang on 16/9/27.
 */
var express =  require('express');
var mongoose = require('mongoose');
var Course = require('../models/course_detail.js');



//db.cse_courses.find({Course:{$regex:/CSE.*/i}})
/*
return courses by searching course number
 */
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
     var course_name = req.query.course_name;
    var section = req.query.section;
    Course.find({"Section": section,"Course":course_name},function (err, result) {
            if(err){
                console.log(err);
            }
            if(!result){
                res.json({"error":"no such course not exist","errno":"400","data":""});
            }

            res.json({"error":"Success","errno":"200","data":result});
    })
};

//router.get('/courses_search/:name', function (req, res) {
  //  var name =req.body.name;
    //res.render('modules/'+name);
//});