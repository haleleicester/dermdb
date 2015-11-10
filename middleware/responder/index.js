var Error = require('../../lib/errors/index.js');

module.exports = function(req, res, next){
    if (typeof res.locals.packet === "undefined" || res.locals.packet === null){
        // Content Not Found - 404
        var err = new Error.HTTPError({
            message: "Not Found",
            url: req.headers.host + req.url
        });
        next(err);
    } else {
        //Respond With Content
        if (typeof res.locals.packet.status === "undefined" || res.locals.packet.status === null){
            res.locals.packet.status = "ok";
        }
        var diff = process.hrtime(res.locals.metrics.startTime);
        res.locals.packet.time = (diff[0] * 1e9 + diff[1])/1000000;
        res.json(res.locals.packet);
    }
};