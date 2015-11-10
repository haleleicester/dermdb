var Error = require('../../../lib/errors/index.js');
var mysql = require('../../../interfaces/mysql/index.js');
var bcrypt = require('bcryptjs');

module.exports = function(req, res, next){
    if (typeof req.body.password !== "undefined" && req.body.email !== "undefined"){
        var q = "SELECT * FROM accounts WHERE email = " + mysql.escape(req.body.email);
        mysql.query(q, function(err, result){
            var e;
            if (err) {
                e = new Error.MySQLError(err);
                next(e);
            } else if (typeof result === "undefined") {
                e = new Error.AuthError({message:"Failed Login"});
                next(e);
            } else {
                bcrypt.compare(req.body.password, result[0].password, function(err, r) {
                    if (err || !r){
                        e = new Error.AuthError({message:"Failed Login"});
                        next(e);
                    } else {
                        res.locals.packet = {data: {}, message: "Success"};
                        next();
                    }
                });
            }
        });
    }
};