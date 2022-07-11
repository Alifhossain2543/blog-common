"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const customErrorHandler_1 = require("../middlewares/customErrorHandler");
class BadRequest extends customErrorHandler_1.CustomErrorHandler {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.BadRequest = BadRequest;
