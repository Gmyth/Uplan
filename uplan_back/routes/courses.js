/**
 * Created by dylanwang on 16/9/27.
 */
var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
var mongoose =require('mongoose');
var Course = require('../models/courses');

//router.get('/', function (req, res) {
   //var name =req.body.name;
    //res.render('modules/'+name);
  //  res.send('id: ' + req.query.q);
//});

router.get('/',function (req,res) {
    var newrex = new RegExp(req.query.q,"i");
    Course.find({"Course": newrex},function (err,result) {
        if(err){
            console.log(err)
        }
        res.json(result);
    })
});

router.get('/search',function (req,res) {
    var courses = req.body.courses;
    var newrexcourse = RegExp(courses.Course, "i");
    var status = courses.status;
    Course.find({})
});
module.exports =router;