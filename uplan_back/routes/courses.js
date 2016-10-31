/**
 * Created by dylanwang on 16/9/27.
 * Edited by EnzeQian
 */
var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
var mongoose =require('mongoose');
var under_Course = require('../models/undergra_courses');
var gra_Course = require('../models/gradua_courses');
var isMorning  = function(time){
    var timepattern = /(\d{1,2}):(\d{2})(AM)/;/*regular expression to find correct time format*/
    return timepattern.test(time);
}
var TimeSpan = function(input){
    var str = input.replace(/\s/g, "");
    var timepattern = /(\d{1,2}):(\d{2})(AM|PM)/;
    /*regular expression to find correct time format*/
    var StartTime = timepattern.exec(str);
    var temp = str.substring(str.indexOf("-") + 1, str.length);
    var EndTime = timepattern.exec(temp);
    if(StartTime==null||EndTime==null||StartTime.length<1||EndTime.length<1){
        return [];
    }
    var StartHour = StartTime[1] == 12 ? 0 : StartTime[1];
    var Startminutes = StartTime[2];
    var EndHour = EndTime[1] == 12 ? 0 : EndTime[1];
    var Endminutes = EndTime[2];
    var result=[];
    result[0]=(isMorning(StartTime[0]) ? parseInt(StartHour) : parseInt(StartHour) + 12)*100+parseInt(Startminutes);
    result[1]=(isMorning(EndTime[0]) ? parseInt(EndHour) : parseInt(EndHour) + 12)*100+parseInt(Endminutes);


    return result;

}
//router.get('/', function (req, res) {
//var name =req.body.name;
//res.render('modules/'+name);
//  res.send('id: ' + req.query.q);
//});//

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
    var start_condition=req.query.selstart; //0 exactly, 1 GREATER than,  2 LESS than
    var end_condition=req.query.selend;
    var txt_start_time = req.query.txtstarttime;
    var txt_end_time =req.query.txtendtime;
    var newrexcourse = RegExp(courses_name, "i");
    //var status = courses.status;
    // search exactly undergra course
    var course = new RegExp(courses_name + ' ' + course_number,"i");
    console.log(req.query);
    if(sel_condition == "0" && course_level == "0"){
        under_Course.find({"Course": course},function (err,result) {
            var oo =[];
            if(txt_start_time!='' && txt_end_time!=''){ //start and end exactly
                for(var i = 0;i<result.length;i++) {
                    var start = TimeSpan(result[i].Time)[0];
                    var end = TimeSpan(result[i].Time)[1];
                    var inputstart = txt_start_time.replace(':', '');
                    var inputend = txt_end_time.replace(':', '');
                    if (start_condition == 0 && end_condition == 0 && start == inputstart && end == inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 1 && end_condition == 0 && start > inputstart && end == inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 2 && end_condition == 0 && start < inputstart && end == inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 0 && end_condition == 1 && start == inputstart && end < inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 1 && end_condition == 1 && start > inputstart && end > inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 2 && end_condition == 1 && start < inputstart && end > inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 0 && end_condition == 2 && start == inputstart && end < inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 1 && end_condition == 2 && start > inputstart && end < inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 2 && end_condition == 2 && start < inputstart && end < inputend) {
                        oo.push(result[i]);
                    }
                }

            }

            else if(txt_start_time!='' && txt_end_time==''){
                for(var i = 0;i<result.length;i++){
                    var start=TimeSpan(result[i].Time)[0];
                    var inputstart=txt_start_time.replace(':','');
                    if(start_condition==0&&start==inputstart){
                        oo.push(result[i]);
                    }
                    else if(start_condition==1&&start>inputstart){
                        oo.push(result[i]);
                    }
                    else if(start_condition==2&&start<inputstart){
                        oo.push(result[i]);
                    }
                }
            }
            else if(txt_start_time=='' && txt_end_time!=''){
                for(var i = 0;i<result.length;i++){
                    var end=TimeSpan(result[i].Time)[1];
                    var inputend=txt_end_time.replace(':','');
                    if(end_condition==0&&end==inputend){
                        oo.push(result[i]);
                    }
                    else if(end_condition==1&&end>inputend){
                        oo.push(result[i]);
                    }
                    else if(end_condition==2&&end<inputend){
                        oo.push(result[i]);
                    }
                }
            }
            if(err){
                console.log(err)
            }
            if(txt_start_time=='' && txt_end_time==''){

                res.json(result);}
            else{res.json(oo);}
        })

    }
    //  open undergra exact
    else if(sel_condition == "0" && course_level == "0" && check_open=="1"){
        under_Course.find({"Course": course , "status" : "Open"},function (err,result) {
            var oo =[];
            if(txt_start_time!='' && txt_end_time!=''){ //start and end exactly
                for(var i = 0;i<result.length;i++) {
                    var start = TimeSpan(result[i].Time)[0];
                    var end = TimeSpan(result[i].Time)[1];
                    var inputstart = txt_start_time.replace(':', '');
                    var inputend = txt_end_time.replace(':', '');
                    if (start_condition == 0 && end_condition == 0 && start == inputstart && end == inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 1 && end_condition == 0 && start > inputstart && end == inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 2 && end_condition == 0 && start < inputstart && end == inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 0 && end_condition == 1 && start == inputstart && end > inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 1 && end_condition == 1 && start > inputstart && end > inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 2 && end_condition == 1 && start < inputstart && end > inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 0 && end_condition == 2 && start == inputstart && end < inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 1 && end_condition == 2 && start < inputstart && end > inputend) {
                        oo.push(result[i]);
                    }
                    else if (start_condition == 2 && end_condition == 2 && start < inputstart && end < inputend) {
                        oo.push(result[i]);
                    }
                }

            }

            else if(txt_start_time!='' && txt_end_time==''){
                for(var i = 0;i<result.length;i++){
                    var start=TimeSpan(result[i].Time)[0];
                    var inputstart=txt_start_time.replace(':','');
                    if(start_condition==0&&start==inputstart){
                        oo.push(result[i]);
                    }
                    else if(start_condition==1&&start>inputstart){
                        oo.push(result[i]);
                    }
                    else if(start_condition==2&&start<inputstart){
                        oo.push(result[i]);
                    }
                }
            }
            else if(txt_start_time=='' && txt_end_time!=''){
                for(var i = 0;i<result.length;i++){
                    var end=TimeSpan(result[i].Time)[1];
                    var inputend=txt_end_time.replace(':','');
                    if(end_condition==0&&end==inputend){
                        oo.push(result[i]);
                    }
                    else if(end_condition==1&&end>inputend){
                        oo.push(result[i]);
                    }
                    else if(end_condition==2&&end<inputend){
                        oo.push(result[i]);
                    }
                }
            }
            if(err){
                console.log(err)
            }
            if(txt_start_time=='' && txt_end_time==''){

                res.json(result);}
            else{res.json(oo);}
        })

    }
    // search exactly gra course
    /*else if ( sel_condition == "1" && course_level == "1"){
     gra_Course.find({"Course": course},function (err,result) {
     if(err){
     console.log(err)
     }
     res.json(result);
     })
     } */

    //search less than under
    else if (sel_condition == "2"&& course_level == "0"){
        under_Course.find(
            {"Course": newrexcourse},function (err,result) {
                var oo = [];
                var oo1= [];
                for(var i = 0;i<result.length;i++){
                    var onlydigit = /\d+/g;
                    var excute = onlydigit.exec(result[i].Course);
                    // console.log(result[i].Course);
                    if(excute[0] < course_number) {
                        oo.push(result[i]);
                    }
                }
                if(txt_start_time!='' && txt_end_time!=''){ //start and end exactly
                    for(var i = 0;i<oo.length;i++) {
                        var start = TimeSpan(oo[i].Time)[0];
                        var end = TimeSpan(oo[i].Time)[1];
                        var inputstart = txt_start_time.replace(':', '');
                        var inputend = txt_end_time.replace(':', '');
                        if (start_condition == 0 && end_condition == 0 && start == inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 0 && start > inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 0 && start < inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 0 && end_condition == 1 && start == inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 1 && start > inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 1 && start < inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 0 && end_condition == 2 && start == inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 2 && start > inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 2 && start < inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                    }

                }

                else if(txt_start_time!='' && txt_end_time==''){
                    for(var i = 0;i<oo.length;i++){
                        var start=TimeSpan(oo[i].Time)[0];
                        var inputstart=txt_start_time.replace(':','');
                        if(start_condition==0&&start==inputstart){
                            oo1.push(oo[i]);
                        }
                        else if(start_condition==1&&start>inputstart){
                            oo1.push(oo[i]);
                        }
                        else if(start_condition==2&&start<inputstart){
                            oo1.push(oo[i]);
                        }
                    }

                }
                else if(txt_start_time=='' && txt_end_time!=''){
                    for(var i = 0;i<oo.length;i++){
                        var end=TimeSpan(oo[i].Time)[1];
                        var inputend=txt_end_time.replace(':','');
                        if(end_condition==0&&end==inputend){
                            oo1.push(oo[i]);
                        }
                        else if(end_condition==1&&end>inputend){
                            oo1.push(oo[i]);
                        }
                        else if(end_condition==2&&end<inputend){
                            oo1.push(oo[i]);
                        }
                    }
                }
                if(err){
                    console.log(err)
                }
                if(txt_start_time=='' && txt_end_time==''){

                    res.json(oo);}
                else{res.json(oo1);}




            })

    }
    //greater than undergra course open
    else if (sel_condition == "2"&& course_level == "0" && check_open=="1"){
        under_Course.find(
            {"Course": newrexcourse , "status": "Open"},function (err,result) {
                var oo = [];
                var oo1= [];
                for(var i = 0;i<result.length;i++){
                    var onlydigit = /\d+/g;
                    var excute = onlydigit.exec(result[i].Course);
                    // console.log(result[i].Course);
                    if(excute[0] < course_number){
                        oo.push(result[i]);
                    }
                }
                if(txt_start_time!='' && txt_end_time!=''){ //start and end exactly
                    for(var i = 0;i<oo.length;i++) {
                        var start = TimeSpan(oo[i].Time)[0];
                        var end = TimeSpan(oo[i].Time)[1];
                        var inputstart = txt_start_time.replace(':', '');
                        var inputend = txt_end_time.replace(':', '');
                        if (start_condition == 0 && end_condition == 0 && start == inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 0 && start > inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 0 && start < inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 0 && end_condition == 1 && start == inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 1 && start > inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 1 && start < inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 0 && end_condition == 2 && start == inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 2 && start > inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 2 && start < inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                    }

                }

                else if(txt_start_time!='' && txt_end_time==''){
                    for(var i = 0;i<oo.length;i++){
                        var start=TimeSpan(oo[i].Time)[0];
                        var inputstart=txt_start_time.replace(':','');
                        if(start_condition==0&&start==inputstart){
                            oo1.push(oo[i]);
                        }
                        else if(start_condition==1&&start>inputstart){
                            oo1.push(oo[i]);
                        }
                        else if(start_condition==2&&start<inputstart){
                            oo1.push(oo[i]);
                        }
                    }
                }
                else if(txt_start_time=='' && txt_end_time!=''){
                    for(var i = 0;i<oo.length;i++){
                        var end=TimeSpan(oo[i].Time)[1];
                        var inputend=txt_end_time.replace(':','');
                        if(end_condition==0&&end==inputend){
                            oo1.push(oo[i]);
                        }
                        else if(end_condition==1&&end>inputend){
                            oo1.push(oo[i]);
                        }
                        else if(end_condition==2&&end<inputend){
                            oo1.push(oo[i]);
                        }
                    }
                }
                if(err){
                    console.log(err)
                }
                if(txt_start_time=='' && txt_end_time==''){

                    res.json(oo);}
                else{res.json(oo1);}
            })

    }
    else if (sel_condition == "1"&& course_level == "0"){
        under_Course.find(
            {"Course": newrexcourse},function (err,result) {
                var oo = [];
                var oo1= [];
                for(var i = 0;i<result.length;i++){
                    var onlydigit = /\d+/g;
                    var excute = onlydigit.exec(result[i].Course);
                    // console.log(result[i].Course);
                    if(course_number<excute[0]){
                        oo.push(result[i]);
                    }
                }
                if(txt_start_time!='' && txt_end_time!=''){
                    for(var i = 0;i<oo.length;i++) {
                        var start = TimeSpan(oo[i].Time)[0];
                        var end = TimeSpan(oo[i].Time)[1];
                        var inputstart = txt_start_time.replace(':', '');
                        var inputend = txt_end_time.replace(':', '');
                        if (start_condition == 0 && end_condition == 0 && start == inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 0 && start > inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 0 && start < inputstart && end == inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 0 && end_condition == 1 && start == inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 1 && start > inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 1 && start < inputstart && end > inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 0 && end_condition == 2 && start == inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 1 && end_condition == 2 && start > inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                        else if (start_condition == 2 && end_condition == 2 && start < inputstart && end < inputend) {
                            oo1.push(oo[i]);
                        }
                    }

                }

                else if(txt_start_time!='' && txt_end_time==''){
                    var inputstart=txt_start_time.replace(':','');
                    for(var i = 0;i<oo.length;i++){
                        var start=TimeSpan(oo[i].Time)[0];
                        if(start_condition ==0 && start==inputstart){
                            oo1.push(oo[i]);
                        }
                        else if(start_condition ==1 && start>inputstart){
                            oo1.push(oo[i]);
                        }
                        else if(start_condition ==2 && start<inputstart){
                            oo1.push(oo[i]);
                        }
                    }

                }
                else if(txt_start_time=='' && txt_end_time!=''){
                    for(var i = 0;i<oo.length;i++){
                        var end=TimeSpan(oo[i].Time)[1];
                        var inputend=txt_end_time.replace(':','');
                        if(end_condition==0&&end==inputend){
                            oo1.push(oo[i]);
                        }
                        else if(end_condition==1&&end>inputend){
                            oo1.push(oo[i]);
                        }
                        else if(end_condition==2&&end<inputend){
                            oo1.push(oo[i]);
                        }
                    }
                }
                if(err){
                    console.log(err)
                }
                if(txt_start_time=='' && txt_end_time==''){

                    res.json(oo);}
                else{res.json(oo1);}




            })

    }



});
module.exports =router;