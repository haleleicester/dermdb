module.exports = function(req, res, next){
    res.locals.packet.data = res.locals.user;
    res.locals.packet.status = "ok";
    var diff = process.hrtime(res.locals.metrics.startTime);
    res.locals.packet.time = (diff[0] * 1e9 + diff[1])/1000000;
    res.json(res.locals.packet);
};