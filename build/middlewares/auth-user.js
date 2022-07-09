"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const AuthValidate_1 = require("../errors/AuthValidate");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session && req.session.jwt) {
        try {
            const user = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_SECRET);
            req.currentUser = {
                id: user.id,
                email: user.email,
            };
            next();
        }
        catch (err) {
            req.session = null;
            console.log(err);
            throw new AuthValidate_1.AuthValidate("You're not authorized to access this page.");
        }
    }
    else {
        throw new AuthValidate_1.AuthValidate("You're not authorized to access this page.");
    }
});
exports.authUser = authUser;
