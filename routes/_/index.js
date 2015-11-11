var express = require('express');
var router = express.Router();
var Error = require('../../lib/errors');

router.get('/', function(req, res, next) {
    res.locals.packet = {
        data: {
            serverName: require('../../package.json').name,
            id: 0,
            version: require('../../package.json').version
        }
    };
    next();
});

var auth = require('./auth/index.js');
router.use("/auth", auth);

var teapot = require('./teapot/index.js');
router.use('/teapot', teapot);

var account = require('./account.js');
router.post('/account', account);

var images = require('./images.js');
router.use("/images", images);

var problems = require('./problems.js');
router.use("/problems", problems);

var problem = require('./problem.js');
router.use("/problem", problem);

module.exports = router;