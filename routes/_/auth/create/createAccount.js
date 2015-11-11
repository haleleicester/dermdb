var mysql = require("../../../../interfaces/mysql/index");
var bcrypt = require('bcryptjs');
var logger = require('jethro');
var createUser = require('./createUser.js');

module.exports = function(body, cb) {
    var email = mysql.escape(body.email);
    logger("debug", "Bcrypt", "Creating salt...");
    bcrypt.genSalt(12, function (err, salt) {
        logger("debug", "Bcrypt", "Salt: "+salt);
        logger("debug", "Bcrypt", "Hashing password...");
        bcrypt.hash(body.password, salt, function (err, hash) {
            logger("debug", "Bcrypt", "Hash: "+hash);
            var q = "INSERT INTO accounts (email, password) VALUES (" + email + ", '" + hash + "')";
            logger("transport", "MySQL", q);
            mysql.query(q, function (err, result) {
                if (err) {
                    cb(err);
                } else {
                    createUser(result.insertId, cb);
                }
            });
        });
    });
};