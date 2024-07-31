"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        required: true,
        type: String,
    },
    status: {
        required: true,
        type: String,
        enum: ["to do", "in progress", "under review", "completed"],
    },
    priority: {
        type: String,
        enum: ["low", "medium", "urgent"],
    },
    deadline: {
        required: true,
        type: String,
    },
    description: {
        type: String,
    },
    details: {
        type: String,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});
const Task = (0, mongoose_1.model)("Task", taskSchema);
exports.default = Task;
