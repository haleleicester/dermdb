var Error = require('../../../../lib/errors/index.js');
var mysql = require('../../../../interfaces/mysql/index.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('auto-config');

module.exports = function(req, res, next){
    if (typeof req.body.password !== "undefined" && req.body.email !== "undefined"){
        var q = "SELECT * FROM accounts WHERE email = " + mysql.escape(req.body.email);
        mysql.query(q, function(err, result){
            var e;
            if (err) {
                e = new Error.MySQLError(err);
                next(e);
            } else if (typeof result[0] !== "undefined" && result.length === 1) {
                bcrypt.compare(req.body.password, result[0].password, function(err, r) {
                    if (err || !r){
                        e = new Error.AuthError({message:"Failed Login"});
                        next(e);
                    } else {
                        res.cookie('jwt', jwt.sign({
                            foo: true,
                            user: {
                                id: result[0].id
                            },
                            date: new Date()
                        }, config.jwt.salt), {
                            httpOnly: true
                        });
                        res.locals.packet = {data: {id:result[0].id}, message: "Success"};
                        res.locals.packet.status = "ok";
                        var diff = process.hrtime(res.locals.metrics.startTime);
                        res.locals.packet.time = (diff[0] * 1e9 + diff[1])/1000000;
                        res.json(res.locals.packet);
                    }
                });
            } else {
                e = new Error.AuthError({message:"Failed Login"});
                next(e);
            }
        });
    }
};