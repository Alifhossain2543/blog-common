"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidate = void 0;
const customErrorHandler_1 = require("../middlewares/customErrorHandler");
class AuthValidate extends customErrorHandler_1.CustomErrorHandler {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, AuthValidate.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.AuthValidate = AuthValidate;
