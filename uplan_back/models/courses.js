/**
 * Created by dylanwang on 16/9/26.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CourseSchema = new Schema({
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
    }
});
CourseSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('Class')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }


};
var Course = mongoose.model('User', UserSchema);
module.exports = Course;