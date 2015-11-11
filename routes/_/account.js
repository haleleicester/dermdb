var mysql = require('../../interfaces/mysql/index.js');
var Error = require('../../lib/errors');

module.exports = function(req, res, next){
    if (res.locals.user !== null){
        var q = "REPLACE INTO users (id, gender, country, dob_year, eye_colour, skin_tone) VALUES (" + res.locals.user.id + ", ";

        //Values
        if (typeof req.body.gender !== "undefined"){
            q += mysql.escape(req.body.gender) + ", ";
        } else {
            q += "NULL, "
        }

        if (typeof req.body.country !== "undefined"){
            q += mysql.escape(req.body.country) + ", ";
        } else {
            q += "NULL, "
        }

        if (typeof req.body.year !== "undefined"){
            q += mysql.escape(req.body.year) + ", ";
        } else {
            q += "NULL, "
        }

        if (typeof req.body.eye_colour !== "undefined"){
            q += mysql.escape(req.body.eye_colour) + ", ";
        } else {
            q += "NULL, "
        }

        if (typeof req.body.skin_tone !== "undefined"){
            q += mysql.escape(req.body.skin_tone) + ")";
        } else {
            q += "NULL)";
        }

        console.log(q);
        mysql.query(q, function(err, result){
            if (err){
                console.log(err);
                var e = new Error.MySQLError(err);
                next(e);
            } else {
                console.log("Success");
                res.locals.packet = {data: {id:res.locals.user.id}, message: "Success"};
                res.locals.packet.status = "ok";
                var diff = process.hrtime(res.locals.metrics.startTime);
                res.locals.packet.time = (diff[0] * 1e9 + diff[1])/1000000;
                res.json(res.locals.packet);
            }
        });
    } else {
        next(new Error.AuthError({message:"Not Authenticated"}));
    }
};