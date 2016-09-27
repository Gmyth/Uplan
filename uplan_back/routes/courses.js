/**
 * Created by dylanwang on 16/9/27.
 */
var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
var mongoose =require('mongoose');
var Course = require('../models/courses');

router.get('/courses_search/:name', function (req, res) {
   var name =req.body.name;
    res.render('modules/'+name);
});