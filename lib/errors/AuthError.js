var createErrorClass = require('create-error-class');

module.exports = createErrorClass('AuthError', function (prop) {
    if (typeof prop !== "undefined" && typeof prop.message !== "undefined") {
        if (prop.message === "Password Mismatch") {
            this.status = "passwordMismatch";
            this.statusCode = 401;
            this.data = {
                message: prop.message,
                description: "The password and confirmation password on the submitted form did not match, please try again.",
                code: "E_PASS_MISMATCH"
            }
        } else if (prop.message === "Invalid Password") {
            this.status = "invalidPassword";
            this.statusCode = 401;
            this.data = {
                message: prop.message,
                description: prop.description,
                code: "E_INVALID_PASSWORD"
            }
        } else if (prop.message === "Invalid Username") {
            this.status = "invalidUsername";
            this.statusCode = 401;
            this.data = {
                message: prop.message,
                description: prop.description,
                code: "E_INVALID_USERNAME"
            }
        } else if (prop.message === "Invalid Email") {
            this.status = "invalidEmail";
            this.statusCode = 401;
            this.data = {
                message: prop.message,
                description: prop.description,
                code: "E_INVALID_EMAIL"
            }
        } else if (prop.message === "Failed Login") {
            this.status = "invalidLogin";
            this.statusCode = 401;
            this.data = {
                message: prop.message,
                description: "Password or email does not match, please try again.",
                code: "E_LOGIN_FAIL"
            }
        } else {
            throw new Error("Unknown error "+prop);
        }
    } else {
        throw new Error("No Message passed to Error Creator!");
    }
});