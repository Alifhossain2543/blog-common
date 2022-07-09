"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorHandler = void 0;
const customErrorHandler_1 = require("./customErrorHandler");
const express_validator_1 = require("express-validator");
class ValidationErrorHandler extends customErrorHandler_1.CustomErrorHandler {
    constructor(req) {
        super("this is from validation error");
        this.statusCode = 400;
        this.req = req;
        Object.setPrototypeOf(this, ValidationErrorHandler.prototype);
    }
    serializeErrors() {
        const results = (0, express_validator_1.validationResult)(this.req);
        const errors = results.array().map(error => {
            return { message: error.msg, field: error.param };
        });
        return errors;
    }
}
exports.ValidationErrorHandler = ValidationErrorHandler;
