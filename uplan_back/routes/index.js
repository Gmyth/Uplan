var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.send("Hello world");

});

router.get('/signup',function (req,res) {
  res.render('signup', {title: 'register page'});
});
router.get('/signin', function (req, res) {
  res.render('signin', {title:'login page'});
});

module.exports = router;
