var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function (req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    } else {
        res.render('about', {
            title: 'Express'
        });
    }
});

module.exports = router;