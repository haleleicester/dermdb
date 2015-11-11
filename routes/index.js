var express = require('express');
var router = express.Router();
var mysql = require('../interfaces/mysql');

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
}).get('/undefined', function(req, res, next){
    res.send("<h1>NOPE</h1>");
});

var api = require('./_/index.js');
router.use("/_", api);

var auth = require('./auth.js');
router.use("/auth", auth);

router.use(function(req, res, next){
    if (res.locals.user !== null) {
        next();
    } else {
        res.redirect("/auth/login");
    }
});

router.get("/account", function(req, res, next){
    res.render("index", {page: "account"});
});

router.get("/problems", function(req, res, next){
    mysql.query("SELECT * FROM problems WHERE uid = " + res.locals.user.id, function(err, result){
        if (err){
            var e = new Error.MySQLError(err);
            next(e);
        } else {
            res.render("index", {page:"problems", data:result});
        }
    })
}).get("/problem/submit", function(req, res, next){
    res.render("index", {page:"problem"});
}).get("/problem/:id", function(req, res, next){
    console.log(req.params.id);
    mysql.query("SELECT * FROM snapshots WHERE pid = " + req.params.id + " AND uid = " + res.locals.user.id, function(err, result){
        res.render("index", {page:"snapshots", data:result})
    })
});

router.get("/snapshot/submit", function(req, res, next){
    res.render("index", {page:"snapshot"});
}).get("/snapshot/:id", function(req, res, next){
    console.log(req.params.id);
    mysql.query("SELECT * FROM snapshots WHERE pid = " + req.params.id + " AND uid = " + res.locals.user.id, function(err, result){
        res.render("index", {page:"problem", data:result})
    })
});

module.exports = router;