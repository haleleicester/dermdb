var Error = require('../../lib/errors/index.js');

module.exports = function(req, res, next){
    var err = new Error.HTTPError({message:"Teapot"});
    next(err);
};