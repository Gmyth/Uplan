/**
 * Created by dylanwang on 16/10/1.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var coursetakenSchema = new Schema({
    course_taken:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courses'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});

var coursetaken = mongoose.model('coursetaken',coursetakenSchema);


module.exports = coursetaken;