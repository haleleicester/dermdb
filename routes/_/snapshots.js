module.exports = function(req, res, next){
    if (typeof req.body.description !== "undefined"){
        var q = "INSERT INTO snapshots (pid, uid, description) VALUES (";
        var v =
        mysql.query(q + v, function(err, result){
            if (err){
                var e = new Error.MySQLError(err);
                next(e);
            } else {

            }
        })
    } else {
        var e = new Error.HTTPError("Missing Parameters");
        next(e);
    }
};