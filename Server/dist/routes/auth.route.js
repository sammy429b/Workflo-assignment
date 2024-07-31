"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.registerController);
router.post("/login", auth_controller_1.loginController);
router.get("/logout", auth_controller_1.logoutController);
exports.default = router;
