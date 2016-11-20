/**
 * Created by dylanwang on 16/11/17.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var Comment_schemma = new mongoose.Schema({

    username: String,
    userprofile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',autopopulate: true
    },
    Course_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course_detail',autopopulate: true
    },
    //what is going on
    comments:String,
    meta:{
        CreateAt:{
            type:Date,
            dafault:Date.now()
        },
        updateAt:{
            type: Date,
            default:Date.now()
        } },//test
        // replies:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref:'Comments',
        // },
        useful:{
            type:Number,
            dafault:0
        },
        unuseful: {
            type:Number,
            dafault:0
        },

},{collection:'comments'});

Comment_schemma.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

var Comments = mongoose.model('Comments', Comment_schemma);

module.exports = Comments;