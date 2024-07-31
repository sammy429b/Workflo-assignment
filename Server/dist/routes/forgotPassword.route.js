"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ForgotPassword_controller_1 = require("../controllers/ForgotPassword.controller");
const router = (0, express_1.Router)();
router.post("/password/email", ForgotPassword_controller_1.sendOTPController);
router.post("/password/otp", ForgotPassword_controller_1.verifyOTPController);
router.post("/password/reset", ForgotPassword_controller_1.forgotPasswordController);
exports.default = router;
