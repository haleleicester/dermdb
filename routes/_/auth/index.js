var express = require('express');
var router = express.Router();

//Endpoints
var create_account = require('./create/index.js');
var login = require('./login/index.js');
var logout = require('./logout/index.js');
var session = require('./session/index.js');

//Routes
router.post('/create', create_account);
router.post('/login', login);
router.get('/session', session);
router.delete('/logout', logout);

module.exports = router;
