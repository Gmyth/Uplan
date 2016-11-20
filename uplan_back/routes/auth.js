/**
 * Created by dylanwang on 16/10/27.
 */
var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

router.get('/google',passport.authenticate('google',{scope:'profile email'}));
router.get('/google/callback', passport.authenticate('google',{

    failureRedirect: '/signin.html'}),(req,res)=>{
            console.log(req);
    console.log('111111')
    console.log(req.session)
    res.redirect(req.session.returnTo || '/'+req.session);
});
//ll
module.exports = router;