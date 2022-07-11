"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const customErrorHandler_1 = require("../middlewares/customErrorHandler");
class NotFound extends customErrorHandler_1.CustomErrorHandler {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        Object.setPrototypeOf(this, NotFound.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.NotFound = NotFound;
