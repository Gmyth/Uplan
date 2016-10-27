/**
 * Created by dylanwang on 16/10/23.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github');
var GoogleStrategy = require('passport-google-oauth2');
var secrets = require('./githubsOauth');
var User = require('../models/user');

/**
 * serilize the user
 */
passport.serializeUser(function (user,done) {
    done(null,user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id,function (err,user) {
        if(err) {
            console.error('There was an error accessing the records of' +
                ' user with id: ' + id);
            return console.log(err.message);
        }
        console.log(id);
        return done(null, user);
    })
});

/**
 * use the comparePassword method to verify the login of local usr
 */

passport.use('local',new LocalStrategy({usernameField:'name',
                                passwordField:'password'
                }, function (name,password,done) {
    //usr = user[name];
                User.findOne({name:name},function (err, user) {
                if(err){return done(err);}
                if(!user){
                return done(null, false, {msg:'not found'});
                }
                    user.comparePassword(password, function(err, isMatch){
                       if(err){
                           console.log(err);
                           return done(err);
                       }
                       if(isMatch){
                           //req.json(user);
                           console.log(user);
                           return done(null,user);
                       }
                       else{

                           console.log('Password is not matched');


                       }
                    })


                })
    }));





/**
 * Sign in with Google.
 */

passport.use(new GoogleStrategy({
    clientID:'39457571589-2daf6d46b5oemlusad0jfncskm4kmumf.apps.googleusercontent.com',
    clientSecret:'twnEwie6TsFBip94g0qJDE9k',
    callbackURL:'/auth/google/callback',
    passReqToCallback:true
},function(req,accessToken, refreshToken, profile, done){
    if(req.user){
        User.findOne({google:profile.id},function(err,existingUser){
            if(err){return done(err)}
            if(existingUser){
                req.flash('errors',{msg:'There is already a Google account that belongs ' +
                'to you. Sign in with that account or delete it, then link it with your current account.'})
                done(err);
            }else{
                User.findById(req.user.id, function(err,user){
                    if(err){
                        return done(err);
                    }
                    //need to modify here
                    user.google = profile.id;
                    user.tokens.push({kind:'google',accessToken:accessToken});
                    user.profile.name=user.profile.name|| profile.displayName;
                    //user.profile.gender = user.profile.gender ||profile._json.gender;
                    user.profile.picture=user.profile.picture ||profile._json.image.url;
                    user.save(function(err){
                        req.flash('info',{msg:'Google account has been linked.'});
                        done(err, user);
                    });
                });
            }
        });
}
else{
    User.findOne({google:profile.id},function(err,existingUser){
        if (err) { return done(err); }
        if (existingUser) {
            return done(null, existingUser);
        }
        User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser){
            if(err){return done(err);}
            if(existingEmailUser){
                req.flash('errors',{msg: 'There is already an account using this email address. ' +
                'Sign in to that account and link it with Google manually from Account Settings.' });
            done(err);
            }
        })
    })
    }
}));



// User.findOne({name:name}).populate('course_taken').exec(function (err,user) {
//     if(err){
//         console.log(err);
//     }
//     if(!user){
//         return res.redirect('/signup');
//         // if the account is not exsit, return back to the signup page
//     }
//     user.comparePassword(password, function(err, isMatch){
//         if(err){
//             console.log(err);
//         }
//         if(isMatch){
//
//             res.json(user);
//             // if get matched password then save in to memory
//
//         }
//         else{
//             //res.end('<h1>Password is not matched</h1>');
//             console.log('Password is not matched');
//             return done(null.false,{messege:'Password is not matched'});
//
//         }
//
//     })
//
// })
module.exports=passport;