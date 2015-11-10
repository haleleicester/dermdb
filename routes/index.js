var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.packet = {
        data: {
            serverName: require('../package.json').name,
            id: 0,
            version: require('../package.json').version
        }
    };
    next();
});

var auth = require('./auth/index.js');
router.use("/auth", auth);

var teapot = require('./teapot/index.js');
router.use('/teapot', teapot);

module.exports = router;