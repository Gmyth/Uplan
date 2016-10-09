/**
 * Created by dylanwang on 16/10/8.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId


var gra_CourseSchema = new Schema({
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
},{
    collection:'under_graduate_courses'
});
gra_CourseSchema.statics = {
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




gra_CourseSchema.search = function (req, res, callback) {
    db.get().collection('cse_courses',function (err,collection) {
        if(err){
            return callback(err);
        }
        var pattern = new RegExp(req, "i");
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

var gra = mongoose.model('gra', gra_CourseSchema);
module.exports = gra;