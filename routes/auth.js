var express = require('express');
var router = express.Router();

router.get('/create', function(req, res, next) {
    if (res.locals.user !== null) {
        res.redirect("/account");
    } else {
        res.render('index', {page: 'create'});
    }
}).get('/email', function(req, res, next) {
    if (res.locals.user !== null) {
        res.render('index', { page: 'email' });
    } else {
        res.redirect("/auth/login");
    }
}).get('/login', function(req, res, next) {
    if (res.locals.user !== null) {
        res.redirect("/account");
    } else {
        res.render('index', {page: 'login'});
    }
}).get('/logout', function(req, res, next) {
    if (res.locals.user !== null) {
        res.render('index', {page: 'logout'});
    } else {
        res.redirect("/auth/login");
    }
});

module.exports = router;