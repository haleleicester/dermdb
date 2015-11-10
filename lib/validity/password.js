var commonPassword =    require('common-password');
var owasp =             require('owasp-password-strength-test');

// Pass a hash of settings to the `config` method. The settings shown here are
// the defaults.
owasp.config({
    allowPassphrases       : true,
    maxLength              : 18,
    minLength              : 6,
    minPhraseLength        : 15,
    minOptionalTestsToPass : 4
});

function check(password){
    if (password.length <= 6 || password === null) {
        return "Password too short! Length was " + password.length + ", required length is " + 7;
    } else if (password.length >= 61){
        return "Password too long! Length was " + password.length + ", maximum length is " + 60;
    } else {
        if (commonPassword(password)) {
            return "Password is too common!";
        } else {
            return owaspCheck(password);
        }
    }
}

function owaspCheck(password){
    var result = owasp.test(password);
    if (result.errors.length >= 1){
        var arr = [];
        for (var i in result.errors){
            if (result.errors.hasOwnProperty(i)){
                var msg = result.errors[i] + " ";
                arr.push(msg);
            }
        }
        return arr.join(" ");
    } else {
        return true;
    }
}

module.exports = check;