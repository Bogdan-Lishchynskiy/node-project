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


router.get('/', function (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    res.render('contact', {
      title: 'hhhhhhhhhhhhhhhhhhhhhhh'
    });
  }
});




router.post('/contacts', function (req, res, next) {


  console.log(req.body.name);

  con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
    var sql = "INSERT INTO contact (name, cell_phone , email , message) VALUES ('" + req.body.name + "','" + req.body.phone + "','" + req.body.email + "','" + req.body.message + "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

  res.send('respond from back-end after contact us submit:  firstname = ' + req.body.name + " " + "usermail = " + req.body.email);



});

module.exports = router;