"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customErrorHandler_1 = require("./customErrorHandler");
const errorHandler = (err, req, res, next) => {
    if (err instanceof customErrorHandler_1.CustomErrorHandler) {
        const serializedErrors = err.serializeErrors();
        return res.status(err.statusCode).json({ errors: serializedErrors });
    }
    // console.error(err.stack);
    console.log(err.stack);
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
exports.errorHandler = errorHandler;
//write a class to catch database validation error
