var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test"
});

/* GET users listing. */


router.get('/', function(req, res, next) {
  res.render('register', { title: 'hhhhhhhhhhhhhhhhhhhhhhh' });
});




router.post('/search', function(req, res, next) {
  console.log(req.body.language);

 
con.connect(function(err) {
  if (err) throw  err;
  console.log("connected");
  var sql = "INSERT INTO admins (username, surname , usermail, passw, gender,program_language, startdate) VALUES ('"+req.body.username+"','"+req.body.surname+"','"+req.body.usermail+"','"+req.body.password+"','"+req.body.gender+"','"+req.body.language+"', '"+req.body.startdate+"')";
  con.query(sql, function(err, result)  {
   if(err) throw err;
   console.log("1 record inserted");
  //  res.render('index', { title: 'hhhhhhhhhhhhhhhhhhhhhhh' });
  });
});

   res.send('User'+ " " +req.body.username + " "  + 'created sucsesfully' 
  + " " + 'go to log in page'  )  ;
  // res.redirect('/');


});

module.exports = router;
