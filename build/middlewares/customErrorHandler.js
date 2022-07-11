"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorHandler = void 0;
class CustomErrorHandler extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomErrorHandler.prototype);
    }
}
exports.CustomErrorHandler = CustomErrorHandler;
