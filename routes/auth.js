var express = require('express');
var router = express.Router();

router.get('/account', function(req, res, next) {
    res.render('index', { page: 'account' });
}).get('/create', function(req, res, next) {
    res.render('index', { page: 'create' });
}).get('/email', function(req, res, next) {
    res.render('index', { page: 'email' });
}).get('/login', function(req, res, next) {
    res.render('index', { page: 'login' });
}).get('/logout', function(req, res, next) {
    res.render('index', { page: 'logout' });
});

module.exports = router;