const { constants } = require("../constants");
const errorHandler = (err, res, req, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            req.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.NOT_FOUND:
            req.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.UNAUTHORIZED:
            req.json({
                title: "Un authorized",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.FORBIDDEN:
            req.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.SERVER_ERROR:
            req.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });

        default:
            console.log("No Error, All good !");
            break;
    }


};

module.exports = errorHandler;