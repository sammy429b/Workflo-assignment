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
exports.verifyOTPController = exports.sendOTPController = exports.forgotPasswordController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const MailSender_1 = __importDefault(require("../utils/MailSender"));
const generateOTP_1 = __importDefault(require("../utils/generateOTP"));
const Redis_1 = __importDefault(require("../utils/Redis"));
const forgotPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rerenterPassword, newPassword, email } = req.body;
        console.log(rerenterPassword, " ", newPassword);
        if (!rerenterPassword || !newPassword) {
            return res.status(400).json({ message: "Provide new and old both password" });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        const newPass = yield user_model_1.default.updateOne({ email }, { $set: { password: hashedPassword } });
        console.log(newPass);
        return res.status(200).json({ message: "Successfully changed password" });
    }
    catch (error) {
        console.log("error in forgot password", error);
    }
});
exports.forgotPasswordController = forgotPasswordController;
const sendOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log(req.body);
        console.log(email);
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        // otp gernartion storing in redis
        const otp = (0, generateOTP_1.default)();
        yield Redis_1.default.set(`${email}:otp`, otp, 'EX', 120);
        const redisOTP = yield Redis_1.default.get(`${email}:otp`);
        if (redisOTP) {
            yield (0, MailSender_1.default)(email, redisOTP);
        }
        res.status(200).json({ Message: "Please Check Your Mail For OTP" });
    }
    catch (error) {
        console.log("error in sendOTP controller");
        res.status(400).json({ message: "Internal server error" });
    }
});
exports.sendOTPController = sendOTPController;
const verifyOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, OTP } = req.body;
        console.log(req.body);
        console.log(email);
        const user = user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        const redisOTP = yield Redis_1.default.get(`${email}:otp`);
        if (redisOTP === OTP) {
            return res.json({ message: "set your new password" });
        }
        res.status(200).json({ Message: "Please Check Your Mail For OTP" });
    }
    catch (error) {
        console.log("error in sendOTP controller");
        res.status(400).json({ message: "Internal server error" });
    }
});
exports.verifyOTPController = verifyOTPController;
