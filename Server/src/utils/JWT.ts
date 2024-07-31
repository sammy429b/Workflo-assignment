import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
dotenv.config();

export async function JWTsign(payload: number): Promise<string | null> {
    const JWT_SECRET_KEY = process.env.SECRET_KEY || "FBQ7ujQq96eGEF1lZiOxLWAg+ue6wV0H45C0ythHpF4";

    if (!JWT_SECRET_KEY) {
        console.error('JWT Secret Key is missing');
        return null;
    }

    try {
        const token = jwt.sign({ id: payload }, JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '24h',
        });
        console.log(token);
        return token;
    } catch (error) {
        console.error('Error signing JWT:', error);
        return null;
    }
}

export async function JWTverify(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(404).json({ message: "Invalid token" });
            return;
        }
        next();
    } catch (error) {
        console.error('Error in verifying JWT:', error);
        res.status(401).json({ message: "Unauthorized" });
    }
}
