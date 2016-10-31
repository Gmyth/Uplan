var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('./config/passport');
const flash = require('express-flash');

//var flash=require('c-flash');
var mongoStore = require('connect-mongo')(session);
var routes = require('./routes/routes');
var users = require('./routes/users');
//var auth = require('./routes/auth');
//var apps = require('./app/app');

var courses = require('./routes/courses');
var app = express();

var http =require('http');
var cors = require('cors');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/TestDatabase', function (err) {
    if(err){
        console.log('connection fail for mongodb...');
    } else{
        console.log('connection success! ');
    }

});



// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//
//     next();
// };


// view engine setup
app.set('views', path.join(__dirname, 'views/test_pages'));
app.set('view engine', 'jade');
app.options('*', cors());




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'dest/', 'favicon.ico')));
app.use(logger('dev'));
//app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'dest/')));


app.use(session({
    //防止篡改cookie
    secret: 'Myblog',
    key : 'blog',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new mongoStore({
        url: 'mongodb://localhost/TestDatabase',
        //把session保存到mongodb的collection的sessions里
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(function(req, res, next) {
    // After successful login, redirect back to the intended page
    if (!req.user &&
        req.path !== '/login' &&
        req.path !== '/signup' &&
        !req.path.match(/^\/auth/) &&
        !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    }
    next();
});
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
//iiii
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//app.use('/', users);
app.use('/get_courses_info',courses);
app.use('/', routes);
//app.use('/get_courses_info',courses);
// app.use('/auth',auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// Use native Node promises

//asdad
//ssss
app.use(require('connect-multiparty'));
if('development' === app.get('env')){
    app.set('showStackEror', true);
    app.use(logger(':method :url :status'));//print the request
    app.locals.pretty =true; //set format when browsing data
    mongoose.set('debug', true);//print database
}



app.listen(port);
