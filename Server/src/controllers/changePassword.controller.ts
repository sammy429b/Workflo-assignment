import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt"


interface forgotPasswordType {
    rerenterPassword: string,
    newPassword: string,
    email: string
}

interface changePasswordType {
    oldPassword: string,
    newPassword: string,
    email: string
}

export const changePasswordController = async (req: Request, res: Response) => {
    try {
        

        const { oldPassword, newPassword, email } = req.body as changePasswordType;
        console.log(oldPassword, " ", newPassword)
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Provide new and old both password" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const pass = user?.password

        const isPasswordMatch = await bcrypt.compare(oldPassword, pass)
        console.log(isPasswordMatch)
        console.log(pass)

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const newPass = await User.updateOne({ email }, { $set: { password: hashedPassword } })
        console.log(newPass)
        return res.status(200).json({ message: "Successfully changed password" });
    } catch (error) {
        console.log("error in change password", error)
    }
}

