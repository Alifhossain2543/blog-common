import { CustomErrorHandler } from "../middlewares/customErrorHandler";
export declare class NotFound extends CustomErrorHandler {
    statusCode: number;
    constructor(message: string);
    serializeErrors(): any;
}
