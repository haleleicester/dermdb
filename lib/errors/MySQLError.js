var createErrorClass = require('create-error-class');

module.exports = createErrorClass("MySQLError", function(err){
    if (typeof err !== "undefined" && typeof err.code !== "undefined") {
        if (err.code === "ER_DUP_ENTRY") {
            if (err.toString().indexOf("for key 'username'") > -1) {
                this.status = "usernameExists";
                this.statusCode = 200;
                this.data = {
                    message: "Account Exists",
                    description: "This username is taken, please try another",
                    code: "E_DUP_USERNAME"
                }
            } else if (err.toString().indexOf("for key 'email'") > -1) {
                this.status = "emailExists";
                this.statusCode = 200;
                this.data = {
                    message: "Account Exists",
                    description: "This email has already been used, please login, or try a different email.",
                    code: "E_DUP_EMAIL"
                }
            }
        } else {
            this.status = "dbError";
            this.statusCode = 200;
            this.data = {
                message: "Database Error",
                description: "An unhandled database error has occurred.",
                code: err.code
            }
        }
    } else {
        throw new Error("No Message passed to Error Creator!");
    }
});