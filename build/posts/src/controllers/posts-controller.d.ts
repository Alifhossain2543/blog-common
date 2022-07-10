import { Request, Response } from "express";
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
export declare const postTestRoute: (req: Request, res: Response) => Promise<void>;
export declare const postTestRouteTwo: (req: Request, res: Response) => Promise<void>;
export declare const createPost: (req: Request, res: Response) => Promise<void>;
export declare const updatePost: (req: Request, res: Response) => Promise<void>;
export declare const deletePost: (req: Request, res: Response) => Promise<void>;
