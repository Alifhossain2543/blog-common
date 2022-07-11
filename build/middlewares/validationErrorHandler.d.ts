import { Request } from "express";
import { CustomErrorHandler } from "./customErrorHandler";
export declare class ValidationErrorHandler extends CustomErrorHandler {
    statusCode: number;
    req: Request;
    constructor(req: Request);
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
