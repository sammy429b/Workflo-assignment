import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import sendOTP from "../utils/MailSender";
import generateOTP from "../utils/generateOTP";
import redis from "../utils/Redis";

interface forgotPasswordType {
    rerenterPassword: string,
    newPassword: string,
    email: string
}

export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const { rerenterPassword, newPassword, email } = req.body as forgotPasswordType;
        console.log(rerenterPassword, " ", newPassword)
        if (!rerenterPassword || !newPassword) {
            return res.status(400).json({ message: "Provide new and old both password" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const newPass = await User.updateOne({ email }, { $set: { password: hashedPassword } })
        console.log(newPass)
        return res.status(200).json({ message: "Successfully changed password" });
    } catch (error) {
        console.log("error in forgot password", error)
    }
}


export const sendOTPController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        console.log(req.body)
        console.log(email)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        // otp gernartion storing in redis
        const otp = generateOTP();
        await redis.set(`${email}:otp`, otp, 'EX', 120);
        const redisOTP = await redis.get(`${email}:otp`);
        if (redisOTP) {
            await sendOTP(email, redisOTP);
        }
        res.status(200).json({ Message: "Please Check Your Mail For OTP" })

    } catch (error) {
        console.log("error in sendOTP controller");
        res.status(400).json({ message: "Internal server error" })
    }
}

export const verifyOTPController = async (req: Request, res: Response) => {
    try {
        const { email, OTP } = req.body;
        console.log(req.body)
        console.log(email)
        const user = User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        const redisOTP = await redis.get(`${email}:otp`);
        if (redisOTP === OTP) {
            return res.json({ message: "set your new password" })
        }
        res.status(200).json({ Message: "Please Check Your Mail For OTP" })

    } catch (error) {
        console.log("error in sendOTP controller");
        res.status(400).json({ message: "Internal server error" })
    }
}