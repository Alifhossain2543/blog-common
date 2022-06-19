"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validationErrorHandler_1 = require("../middlewares/validationErrorHandler");
const validateRequest = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        throw new validationErrorHandler_1.ValidationErrorHandler(req);
    }
    next();
};
exports.validateRequest = validateRequest;
