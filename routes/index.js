var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

var api = require('./_/index.js');
router.use("/_", api);

module.exports = router;