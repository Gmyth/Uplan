/**
 * Created by dylanwang on 16/11/15.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var undergra_CourseSchema = new Schema({
    status:String,
    Room:String,
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
    Credits:String,
    Enrollment_Capacity: String,
    Enrollment_Total:String,
    Seats_Available:String,
    Dates:String,
    Chained_Courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'undergra_course_detail_2017spring'
    },
    Course_Description:String,
    //Other_Courses_Taught_By
},{
    collection:'undergra_course_detail_2017spring'
});

undergra_CourseSchema.statics = {

    findById: function (id, cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

var Course_detail = mongoose.model('Course_detail', undergra_CourseSchema);

module.exports = Course_detail;
