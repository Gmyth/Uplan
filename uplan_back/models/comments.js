/**
 * Created by dylanwang on 16/11/17.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var Comment_schemma = new mongoose.Schema({

    username: String,
    comments:String,
    meta:{
        CreateAt:{
            type:Date,
            dafault:Date.now()
        },
        updateAt:{
            type: Date,
            default:Date.now()
        },reply:{} },
        replies:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'',
        }


})

