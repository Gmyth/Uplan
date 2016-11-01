/**
 * Created by dylanwang on 16/10/23.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
//var secrets = require('./../controllers/githubsOauth');
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
        //console.log(id);
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
                           //console.log(user);
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
        clientID: '39457571589-j69mjrhv5o9grcilig0n0i2aore6itds.apps.googleusercontent.com',
        clientSecret: 'gykhVbeQwSI8iJXl7JTm_Jh5',
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'google.id': profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    console.log(profile);
                    //console.log(user.profile.gender);
                    console.log(profile._json.gender);
                    var newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.profile.tokens.push({kind:'google',accessToken:token});
                    newUser.name = profile.displayName;
                    newUser.profile.username = profile.displayName;
                    newUser.google.name =  profile.displayName;
                    newUser.profile.gender = newUser.profile.gender ||profile._json.gender;
                    newUser.profile.picture=newUser.profile.picture ||profile._json.image.url;
                    newUser.email = profile.emails[0].value;
                    newUser.google.email = profile.emails[0].value;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

//ppp

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];

    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};
// passport.use(new GoogleStrategy({
//     authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
//     tokenURL: 'https://accounts.google.com/o/oauth2/token',
//     clientID:'39457571589-j69mjrhv5o9grcilig0n0i2aore6itds.apps.googleusercontent.com',
//     clientSecret:'gykhVbeQwSI8iJXl7JTm_Jh5',
//     callbackURL:'http://localhost:3000/auth/google/callback',
//     passReqToCallback:true
// },function(req,accessToken, refreshToken, profile, done){
//     console.log('112122121')
//     if(req.user){
//         console.log('hi 1st point'+ req.user);
//         User.findOne({google:profile.id},function(err,existingUser){
//             if(err){return done(err)}
//             if(existingUser){
//                 console.log('exist');
//                 console.log(existingUser);
//                 console.log(err);
//                 req.flash('errors',{msg:'There is already a Google account that belongs ' +
//                 'to you. Sign in with that account or delete it, then link it with your current account.'})
//                 done(err);
//             }else{
//                 User.findById(req.user.id, function(err,user){
//                     console.log('hi 4st point'+ req.user.id);
//                     if(err){
//                         return done(err);
//                     }
//                     //need to modify here
//                     user.google = profile.id;
//                     user.tokens.push({kind:'google',accessToken:accessToken});
//                     user.name=user.profile.name|| profile.displayName;
//                     user.profile.gender = user.profile.gender ||profile._json.gender;
//                     user.profile.picture=user.profile.picture ||profile._json.image.url;
//                     user.save(function(err){
//                         console.log('success for google oauth');
//                         req.flash('info',{msg:'Google account has been linked.'});
//                         done(err, user);
//                     });
//                 });
//             }
//         });
// }
// else{
//         console.log('hi 2nd point'+profile.id );
//         console.log('hi 3nd point'+profile.emails );
//     User.findOne({google:profile.id},function(err,existingUser){
//         if (err) { return done(err); }
//         if (existingUser) {
//             return done(null, existingUser);
//         }
//         User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser){
//             if(err){return done(err);}
//             if(existingEmailUser){
//                 console.log('exist user');
//                 req.flash('errors',{msg: 'There is already an account using this email address. ' +
//                 'Sign in to that account and link it with Google manually from Account Settings.' });
//             done(err);
//             }
//             else {
//                 var user = new User();
//                 user.email = profile.email[0].value;
//                 user.google = profile.id;
//                 user.tokens.push({kind:'google',accessToken:accessToken});
//                 user.name = profile.displayName;
//                 user.profile.gender = profile._json.gender;
//                 user.profile.picture = profile._json.image.url;
//                 user.save((err)=>{
//                     done(err, user);
//                 })
//             }
//         })
//     })
//     }
// }));



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