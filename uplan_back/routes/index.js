var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
/* GET home page. */


router.get('/', function(request, response) {
  //var readFile = "/dest/index.html";
  //var fileContents = fs.readFileSync(readFile);

  response.sendFile('index.html');
});

// router.get('/signup',function (req,res) {
//   res.render('signup', {title: 'register page'});
// });
// router.get('/signin', function (req, res) {
//   res.render('signin', {title:'login page'});
// });

module.exports = router;
