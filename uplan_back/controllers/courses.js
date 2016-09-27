/**
 * Created by dylanwang on 16/9/27.
 */
var express =  require('express');
var mongoose = require('mongoose');
var Course = require('../models/courses.js');



//db.cse_courses.find({Course:{$regex:/CSE.*/i}})
/*
return courses by searching course number
 */
exports.list = function (req, res) {
  var _course = req.body;
  Course.find({Course:{$regex:/_course.*/i}})
      .populate('Section')
      .exec(function (err,courses) {
          if(err){
              console.log(err)
          }

          res.json(courses)

      })
};

//router.get('/courses_search/:name', function (req, res) {
  //  var name =req.body.name;
    //res.render('modules/'+name);
//});