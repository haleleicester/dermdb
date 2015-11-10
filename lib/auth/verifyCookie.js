var config = require('auto-config');
var jwt = require('jsonwebtoken');
var Errors = require('../errors/index.js');

module.exports = function(req, res, next){
    jwt.verify(req.cookies.jwt, config.jwt.salt, function (err, decoded) {
        if (!err && decoded.foo === true) {
            next(null, decoded);
        } else {
            next(new Errors.AuthError({
                message: "Not Authenticated"
            }))
        }
    });
};