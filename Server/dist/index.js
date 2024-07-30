"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DBconnect_1 = __importDefault(require("./utils/DBconnect"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use("/", auth_route_1.default);
app.get("/", (req, res) => {
    res.send("TypeScript wiht express");
});
app.listen(port || 5000, () => {
    console.log(`http://localhost:${port}`);
    (0, DBconnect_1.default)();
});
