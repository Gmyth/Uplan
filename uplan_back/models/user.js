/**
 * Created by dylanwang on 16/9/24.
 */
/**
 * Created by dylanwang on 16/9/26.
 */
var mongoose = require('mongoose');

var bcryptjs = require('bcryptjs');
var BCRYPT_SALT_LEN = 11;


var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type:String
    },
    password: String,
    email: String
    ,
    course_taken:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Course'
    }],
    role:{
        //0:normal user
        //1:verified
        //2:pro user
        //>5 admin
        //>50 super admin
        type:Number,
        default:0
    },
    meta:{
        CreateAt:{
            type:Date,
            dafault:Date.now()
        },
        updateAt:{
            type: Date,
            default:Date.now()
        }
    }

},{collection:'userinfo'});
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isNew){
        this.meta.CreateAt = this.meta.updateAt = Date.now()
    }
    else{
        this.meta.updateAt = Date.now()
    }

    bcryptjs.genSalt(BCRYPT_SALT_LEN , function(err, salt){
        if (err) return next(err);

        bcryptjs.hash(user.password, salt, function(err, hash){
            if (err) return next(err);
            user.password = hash;
            next()
        })
    })
});

UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcryptjs.compare(_password, this.password, function (err, isMatch) {
            if(err) return cb(err);

            cb(null, isMatch)
        })

    }
};

UserSchema.statics = {
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



var User = mongoose.model('User', UserSchema);

module.exports = User;