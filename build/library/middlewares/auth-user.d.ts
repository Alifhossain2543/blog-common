import { Request, Response, NextFunction } from "express";
export interface UserInfo {
    fullName?: string;
    email: string;
    id: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserInfo;
        }
    }
}
export declare const authUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
