module.exports = function(err, req, res, next){
    console.log(1);
    if (typeof res.locals.user !== "undefined" && res.locals.user !== null) {
        if (res.locals.user.groupid === 1){
            err.data.error = err.stack;
        }
    } else {
        console.log(2);
        // Display stack trace?
        //err.data.error = err.stack;
        //err.data.error = jwt.sign(err.stack, 'shhhhh');
        console.log(err);
        if (err.status !== "notFound") {
            console.log(err);
            console.log(err.stack);
        }
    }

    /*
     TODO: Store error details and stack trace in database
     */

    if (typeof err.statusCode !== "undefined") {
        res.status(err.statusCode);
    } else {
        res.status(500);
    }
    res.send(err);
};