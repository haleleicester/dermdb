var Error = require('../../../../lib/errors/index.js');
var logger = require('jethro');
var check = {
    email: require('../../../../lib/validity/email'),
    password: require('../../../../lib/validity/password'),
    username: require('../../../../lib/validity/username')
};

var createAccount = require('./createAccount.js');
module.exports = function(req, res, next){
    var b = req.body, err;
    req.body = null;
    if (typeof b.confirmPassword !== "undefined" && typeof b.password !== "undefined" && typeof b.email !== "undefined") {
        if (b.password === b.confirmPassword) {

            //Email Check
            var eCheck = check.email(b.email);
            logger("debug", "Validity", "Email: " + eCheck);
            if (eCheck !== true) {
                if (eCheck === false){
                    eCheck = 'This is not a valid email';
                }
                err = new Error.AuthError({message: "Invalid Email", description: eCheck});
                return next(err);
            }

            //Password Check
            var pCheck = check.password(b.password);
            logger("debug", "Validity", "Password: " + pCheck);
            if (pCheck !== true) {
                err = new Error.AuthError({message: "Invalid Password", description: pCheck});
                return next(err);
            }

            //Create the account
            createAccount(b, function(err, result){
                if (err){
                    var e = new Error.MySQLError(err);
                    next(e);
                } else {
                    res.locals.packet = {data: {uid:result}};
                    next();
                }
            });
        } else {
            err = new Error.AuthError({message: "Password Mismatch"});
            next(err);
        }
    } else {
        err = new Error.HTTPError({message:"Missing Parameters"});
        next(err);
    }
};