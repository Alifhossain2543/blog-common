import { CustomErrorHandler } from "../middlewares/customErrorHandler";
export declare class BadRequest extends CustomErrorHandler {
    statusCode: number;
    constructor(message: string, statusCode?: number);
    serializeErrors(): {
        message: string;
    }[];
}
