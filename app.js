var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var formidable = require("formidable");

var db_users = require('./db/users');
var login = require('./routes/login');
var about = require('./routes/about');
var index = require('./routes/index');
var register = require('./routes/register');
var contact = require('./routes/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('express-session')({
  secret: 'keyboard secret string',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());





app.use('/login', login);
app.use('/about', about);
app.use('/', index);
app.use('/register', register);
app.use('/contact', contact);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

passport.use(new Strategy({
    passReqToCallback: true
  },
  function (req, username, password, done) { // username and password it is what i press in my log in form 
    console.log("USER = username from form: " + username + ' pass: ' + password);
    db_users.findByUsername(username.trim(), function (err, user) {
      if (err) {
        return done(err);
      }

      // if no user is found, return the message
      if (!user)
     
        return done(null, false, req.flash('loginMessage', 'User not found'));

      // if the user is found but the password is wrong
      if (user.password != password)
        return done(null, false, req.flash('loginMessage', 'Password or user name is incorrect'));

      // all is well, return successful user

      return done(null, user);
      console.log(user);
    });

  }));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db_users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

module.exports = app;