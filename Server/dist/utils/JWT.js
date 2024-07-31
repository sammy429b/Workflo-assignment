"use strict";
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
    const JWT_SECRET_KEY = process.env.SECRET_KEY;
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
}
exports.JWTsign = JWTsign;
function JWTverify(req, res, next) {
    const JWT_SECRET_KEY = process.env.secret_key;
    const cookie = req.cookies;
    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    if (!cookie) {
        res.status(401).json({ message: "Token from cookie is missing" });
        return;
    }
    const token = cookie.token;
    if (!token) {
        res.status(200).json({ message: "Unauthorized: token expired", tokenExpired: true });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        const id = decoded.id;
        const user = user_model_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: "Invalid token" });
            return;
        }
        next();
    }
    catch (error) {
        console.log('Error in verifying JWT :', error);
        res.status(401).json({ message: "Unauthorized" });
    }
}
exports.JWTverify = JWTverify;
