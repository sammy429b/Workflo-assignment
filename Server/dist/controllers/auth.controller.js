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
exports.forgetPasswordController = exports.changePasswordController = exports.loginController = exports.registerController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            // console.log(username, email, password)
            return res.status(400).json({ "message": "Username or password missing in request" });
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exist with this email" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_model_1.default({
            username,
            email,
            password: hashedPassword
        });
        yield newUser.save();
        res.status(201).json({ message: "User created successfully.", user: newUser });
    }
    catch (error) {
        console.log("error in register", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "message": "Username or password missing in request" });
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }
        // Passwords match, user authenticated
        res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        console.error("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginController = loginController;
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassowrd, email } = req.body;
        if (!oldPassword || !newPassowrd) {
            return res.status(400).json({ message: "Provide new and old both password" });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const pass = user === null || user === void 0 ? void 0 : user.password;
        const isPasswordMatch = yield bcrypt_1.default.compare(oldPassword, pass);
        console.log(isPasswordMatch);
        console.log(pass);
        const hashedPassword = yield bcrypt_1.default.hash(newPassowrd, 10);
        const newPass = yield user_model_1.default.updateOne({ email }, { $set: { password: hashedPassword } });
        console.log(newPass);
        return res.status(200).json({ message: "Successfully changed password" });
    }
    catch (error) {
        console.log("error in ");
    }
});
exports.changePasswordController = changePasswordController;
const forgetPasswordController = (req, res) => {
    try {
        const { email } = req.body;
        const user = user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
    }
    catch (error) {
    }
};
exports.forgetPasswordController = forgetPasswordController;
