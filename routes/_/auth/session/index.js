module.exports = function(req, res, next){
    res.locals.packet = res.locals.user;
    next();
};