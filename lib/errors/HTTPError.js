var createErrorClass = require('create-error-class');

module.exports = createErrorClass("HTTPError", function(prop){
    if (typeof prop !== "undefined" && typeof prop.message !== "undefined") {
        if (prop.message === "Not Found") {
            this.status = "notFound";
            this.statusCode = 404;
            this.data = {
                message: "Not Found",
                description: "The file or page you are looking for cannot be found on the server at this time, please try again later",
                code: "E_NOT_FOUND",
                url: prop.url
            }
        } else if (prop.message === "Method Not Allowed") {
            this.status = "methodNotAllowed";
            this.statusCode = 405;
            this.data = {
                message: "Method Not Allowed",
                description: "The method used is not supported by this resource.",
                code: "E_METHOD_NOT_ALLOWED",
                url: prop.url
            }
        } else if (prop.message === "Teapot") {
            this.status = "teapot";
            this.statusCode = 418;
            this.data = {
                message: "I'm a little teapot",
                description: "short and stout...",
                code: "E_TEAPOT"
            }
        } else if (prop.message === "Missing Parameters") {
            this.status = "missingParams";
            this.statusCode = 403;
            this.data = {
                message: "Missing parameters",
                description: "Please try again with all the required data.",
                code: "E_MISSING_PARAMS"
            }
        } else {
            throw new Error("Unknown error "+prop);
        }
    } else {
        throw new Error("No Message passed to Error Creator!");
    }
});