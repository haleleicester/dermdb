var mysql = require('../../interfaces/mysql');
var Error = require('../../lib/errors');

module.exports = function(req, res, next){
    console.log(req.body);
    if (typeof req.body.description !== "undefined" && typeof req.body.pid !== "undefined") {
        var q = "INSERT INTO snapshots (pid, uid, description) VALUES (";
        var v = mysql.escape(req.body.pid) + ", " + mysql.escape(res.locals.user.id) + ", " + mysql.escape(req.body.description) + ")";
        mysql.query(q + v, function (err, result) {
            if (err) {
                var e = new Error.MySQLError(err);
                next(e);
            } else {
                res.locals.packet = {data: {id: result.insertId}, message: "Success"};
                res.locals.packet.status = "ok";
                var diff = process.hrtime(res.locals.metrics.startTime);
                res.locals.packet.time = (diff[0] * 1e9 + diff[1]) / 1000000;
                res.json(res.locals.packet);
            }
        })
    } else {
        var e = new Error.HTTPError({message:"Missing Parameters"});
        next(e);
    }
};