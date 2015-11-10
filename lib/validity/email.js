var validator = require("email-validator");

module.exports = function(email){
    if (email.length < 3 || email === null) {
        return "Email too short";
    } else {
        return validator.validate(email)
    }
};