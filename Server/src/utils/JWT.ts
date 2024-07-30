import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
dotenv.config();


export function JWTsign(payload: number): string | null {
    const JWT_SECRET_KEY = process.env.SECRET_KEY;

    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        return null;
    }

    try {
        const token = jwt.sign({ id: payload }, JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });
        console.log(token)
        return token;
    } catch (error) {
        console.error('Error signing JWT:', error);
        return null;
    }
}

export function JWTverify(req: Request, res: Response, next: NextFunction): void {
    const JWT_SECRET_KEY = process.env.secret_key;
    const cookie = req.cookies;
    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        res.status(500).json({ message: "Internal server error" })
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
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const id = (decoded as { id: number }).id;
        const user = User.findById(id);

        if (!user) {
            res.status(404).json({ message: "Invalid token" });
            return;
        }
        next();
    } catch (error) {
        console.log('Error in verifying JWT :', error);
        res.status(401).json({ message: "Unauthorized" });
    }
}
