"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DBconnect_1 = __importDefault(require("./utils/DBconnect"));
const changePassword_route_1 = __importDefault(require("./routes/changePassword.route"));
const forgotPassword_route_1 = __importDefault(require("./routes/forgotPassword.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const corsOptions = {
    origin: ['http://localhost:4173', 'https://strong-nougat-22d92e.netlify.app/', 'http://localhost:8080'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use("/", auth_route_1.default);
app.use("/", changePassword_route_1.default);
app.use("/", forgotPassword_route_1.default);
app.use("/", task_route_1.default);
app.get("/", (req, res) => {
    res.send("TypeScript wiht express");
});
app.listen(port || 5000, () => {
    console.log(`http://localhost:${port}`);
    (0, DBconnect_1.default)();
});
