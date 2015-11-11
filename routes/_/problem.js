var mysql = require('../../interfaces/mysql');
var Error = require('../../lib/errors');

module.exports = function(req, res, next){
    var q = "INSERT INTO problems (uid, type, description) VALUES (" + mysql.escape(res.locals.user.id);
    var v =  ", " + mysql.escape(req.body.type) + ", " + mysql.escape(req.body.description) + ")";
    if (typeof req.body.type !== "undefined" && typeof req.body.description !== "undefined"){
        mysql.query(q + v, function(err, result){
            if (err){
                var e = new Error.MySQLError(err);
                next(e);
            } else {
                res.locals.packet = {data: {id:result.insertId}, message: "Success"};
                res.locals.packet.status = "ok";
                var diff = process.hrtime(res.locals.metrics.startTime);
                res.locals.packet.time = (diff[0] * 1e9 + diff[1])/1000000;
                res.json(res.locals.packet);
            }
        })
    } else {
        var e = new Error.HTTPError({message:"Missing Parameters"});
        next(e);
    }
};