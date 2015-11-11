var jwt = require('jsonwebtoken');
var config = require('auto-config');
var mysql = require('../../interfaces/mysql');
var Error = require('../../lib/errors/index.js');

module.exports = function(req, res, next){
    jwt.verify(req.cookies.jwt, config.jwt.salt, function(err, decoded) {
        if (err){
            res.locals.user = null;
            next();
        } else {
            mysql.query("SELECT * FROM users WHERE id = " + decoded.user.id, function (err, result) {
                if (err) {
                    var e = new Error.MySQLError(err);
                    next(e);
                } else if (typeof result === "undefined" || result === [] || result.length === 0) {
                    mysql.query("INSERT INTO users (id) VALUES (" + decoded.user.id + ")", function (err, result) {
                        if (err) {
                            var e = new Error.MySQLError(err);
                            next(e);
                        } else {
                            res.locals.user = {id: decoded.user.id};
                            next();
                        }
                    })
                } else {
                    res.locals.user = result[0];
                    next();
                }
            });
        }
    });
};