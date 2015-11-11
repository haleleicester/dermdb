var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {page: 'index'}, function(err, html){
        console.log(err);
        if (err){
            next(err);
        } else {
            res.send(html);
        }
    });
});

var api = require('./_/index.js');
router.use("/_", api);

var auth = require('./auth.js');
router.use("/auth", auth);

module.exports = router;