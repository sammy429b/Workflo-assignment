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
exports.changePasswordController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword, email } = req.body;
        console.log(oldPassword, " ", newPassword);
        if (!oldPassword || !newPassword) {
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
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        const newPass = yield user_model_1.default.updateOne({ email }, { $set: { password: hashedPassword } });
        console.log(newPass);
        return res.status(200).json({ message: "Successfully changed password" });
    }
    catch (error) {
        console.log("error in change password", error);
    }
});
exports.changePasswordController = changePasswordController;
