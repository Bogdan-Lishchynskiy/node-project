var express = require('express');
var passport = require('passport');
var router = express.Router();

// var session = require('express-session');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login.ejs', {
    message: req.flash('loginMessage'),
    title: 'Login Form',
    username: ''
  });
});

// router.post('/', function(req, res, next) {
//   res.render('login.ejs', { message: 'fornmm submited' ,title: 'Login Form', username:'' }); 
// });

router.post('/',

  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

// router.post("/",
//  function(req,res,next){
//    console.log('')
//    passport.authenticate("local", function(err, user, info){

//     // handle succes or failure

//   })(req,res,next); 
// })

module.exports = router;