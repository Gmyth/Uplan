/**
 * Created by dylanwang on 16/11/15.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var detail_CourseSchema = new Schema({
    status:String,
    Course_Description:String,
    Title:String,
    Section:String,
    instructors:String,
    Days:String,
    Course:{
        unique: true,
        type:String
    },
    Location:String,
    Time:String,
    Type:String,
    Class:{
        unique: true,
        type:String
    },
    Comments:{    type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'},
    Other_Courses_Taught_By:String,
    On_line_Resources:String
    //Other_Courses_Taught_By
},{
    collection:'course_detail'
});

detail_CourseSchema.statics = {

    findById: function (id, cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

var Course_detail = mongoose.model('Course_detail', detail_CourseSchema);

module.exports = Course_detail;
//test