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
exports.JWTverify = exports.JWTsign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
function JWTsign(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const JWT_SECRET_KEY = process.env.SECRET_KEY || "FBQ7ujQq96eGEF1lZiOxLWAg+ue6wV0H45C0ythHpF4";
        if (!JWT_SECRET_KEY) {
            console.error('JWT Secret Key is missing');
            return null;
        }
        try {
            const token = jsonwebtoken_1.default.sign({ id: payload }, JWT_SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: '24h',
            });
            console.log(token);
            return token;
        }
        catch (error) {
            console.error('Error signing JWT:', error);
            return null;
        }
    });
}
exports.JWTsign = JWTsign;
function JWTverify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const JWT_SECRET_KEY = process.env.SECRET_KEY;
        const token = req.cookies.token;
        if (!JWT_SECRET_KEY) {
            console.error('JWT Secret Key is missing');
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        if (!token) {
            res.status(401).json({ message: "Unauthorized: token is missing" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
            const user = yield user_model_1.default.findById(decoded.id);
            if (!user) {
                res.status(404).json({ message: "Invalid token" });
                return;
            }
            next();
        }
        catch (error) {
            console.error('Error in verifying JWT:', error);
            res.status(401).json({ message: "Unauthorized" });
        }
    });
}
exports.JWTverify = JWTverify;
