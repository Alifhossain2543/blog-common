import { CustomErrorHandler } from "../middlewares/customErrorHandler";
export declare class AuthValidate extends CustomErrorHandler {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
