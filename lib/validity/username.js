var S = require('string');

module.exports = function(username){
    if (username.length < 3 || username === null) {
         return "Username too short";
    } else {
        if (S(username).latinise().s !== username){
            return "Username contains non latin characters";
        } else {
            return true;
        }
    }
};