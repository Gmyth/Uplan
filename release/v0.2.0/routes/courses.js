/**
 * Created by dylanwang on 16/9/27.
 */
var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
var mongoose =require('mongoose');
var under_Course = require('../models/undergra_courses');
var gra_Course = require('../models/gradua_courses');

//router.get('/', function (req, res) {
   //var name =req.body.name;
    //res.render('modules/'+name);
  //  res.send('id: ' + req.query.q);
//});

/* form data format
*txtsubject: course --- string
*selnum: 1 is exactly,2 less than, 3 greater than -- string
*txtnumber: course number
*selllevel : 0 graduate 1 undergraduate
*check_box_id1 : open 1 close 0
*sel_start : time - time stamp format or json
*txtstarttime 13:00
* selend
* txtendtime  15:00
* selcredit
* txtcredit 4
* */
// router.get('/',function (req,res) {
//     var newrex = new RegExp(req.query.q,"i");
//     Course.find({"Course": newrex},function (err,result) {
//         if(err){
//             console.log(err)
//         }
//         res.json(result);
//     })
// });


router.get('/',function (req,res) {
    var courses_name = req.query.txtsubject;
    var course_number =req.query.txtnumber;
    var sel_condition = req.query.selnum;
    var course_level = req.query.selllevel;
    var check_open = req.query.check_box_id1;
    var txt_start_time = req.query.txtstarttime;
    var txt_end_time =req.query.txtendtime;
    var newrexcourse = RegExp(courses_name, "i");
   //var status = courses.status;
    // search exactly undergra course
    var course = new RegExp(courses_name + ' ' + course_number,"i");
    console.log(req.query);
    if(sel_condition == "1" && course_level == "0"){
        under_Course.find({"Course": course},function (err,result) {
         if(err){
             console.log(err)
         }
         res.json(result);
     })

    }
    // search exactly gra course
    else if ( sel_condition == "1" && course_level == "1"){

        gra_Course.find({"Course": course},function (err,result) {
            if(err){
                console.log(err)
            }
            res.json(result);
        })
    }

    //search less than under
    else if (sel_condition == "2"&& course_level == "0"){
        under_Course.find(
            {"Course": newrexcourse},function (err,result) {
                var oo = [];

                for(var i = 0;i<result.length;i++){
                    var onlydigit = /\d/;
                    var excute = onlydigit.exec(result[i].Course);
                   // console.log(result[i].Course);
                    if(excute[0] < course_number){
                        oo.push(result[i]);
                    }
                }

            if(err){
                console.log(err)
            }
            res.json(oo);
        })

    }
    //search less than gra
    else if (sel_condition == "2"&& course_level == "1"){
        gra_Course.find(
            {"Course": newrexcourse},function (err,result) {
                var oo = [];

                for(var i = 0;i<result.length;i++){
                    var onlydigit = /\d/;
                    var excute = onlydigit.exec(result[i].Course);
                   // console.log(result[i].Course);
                    if(excute[0] < course_number){
                        oo.push(result[i]);
                    }
                }

                if(err){
                    console.log(err)
                }
                res.json(oo);
            })


    }

    else if (sel_condition == "3"&& course_level == "0"){
        under_Course.find(
            {"Course": newrexcourse},function (err,result) {
                var oo = [];

                for(var i = 0;i<result.length;i++){
                    var onlydigit = /\d/;
                    var excute = onlydigit.exec(result[i].Course);
                    //console.log(result[i].Course);
                    if(excute[0] > course_number){
                        oo.push(result[i]);
                    }
                }

                if(err){
                    console.log(err)
                }
                res.json(oo);
            })

    }
    //search greater than gra
    else if (sel_condition == "3"&& course_level == "1"){

        gra_Course.find(
            {"Course": newrexcourse},function (err,result) {
                var oo = [];

                for(var i = 0;i<result.length;i++){
                    var onlydigit = /\d/;
                    var excute = onlydigit.exec(result[i].Course);
                    //console.log(result[i].Course);
                    if(excute[0] > course_number){
                        oo.push(result[i]);
                    }
                }

                if(err){
                    console.log(err)
                }
                res.json(oo);
            })
    }
    //under_Course.find({})
});
module.exports =router;