import {Router} from 'express'
import { sendOTPController, verifyOTPController, forgotPasswordController, } from "../controllers/ForgotPassword.controller"

const router = Router();

router.post("/password/email", sendOTPController)
router.post("/password/otp", verifyOTPController)
router.post("/password/reset", forgotPasswordController)


export default router;