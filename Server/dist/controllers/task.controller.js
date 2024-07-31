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
exports.updateTaskController = exports.deleteTaskController = exports.addNewTaskController = exports.getAllTasksController = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        console.log(req.body);
        // Validate the userId
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     return res.status(400).json({ message: "Invalid user ID" });
        // }
        // Convert userId to ObjectId
        const objectId = new mongoose_1.default.Types.ObjectId(userId);
        // Perform aggregation with additional stages for debugging
        const tasks = yield task_model_1.default.aggregate([
            {
                $match: { userId: objectId }
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    tasks: { $push: '$$ROOT' }
                }
            },
            {
                $sort: { count: -1 }
            },
        ]);
        // Return the aggregated results
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.error("Error fetching tasks:", error); // Log detailed error
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllTasksController = getAllTasksController;
const addNewTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, status, priority, deadline, description = "", details = "", userId } = req.body;
        console.log(req.body);
        if (!title) {
            return res.status(400).json({ message: "Title required" });
        }
        if (!status) {
            return res.status(400).json({ message: "Status required" });
        }
        if (!userId) {
            return res.status(200).json({ message: "userID required" });
        }
        const objectId = new mongoose_1.default.Types.ObjectId(userId);
        const task = new task_model_1.default({
            title,
            status,
            priority,
            deadline,
            description,
            details,
            userId: objectId
        });
        yield task.save();
        const tasks = yield task_model_1.default.aggregate([
            {
                $match: { userId: objectId }
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    tasks: { $push: '$$ROOT' }
                }
            },
            {
                $sort: { count: -1 }
            },
        ]);
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.log("error in new task storing", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.addNewTaskController = addNewTaskController;
const deleteTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.body;
        console.log(req.body);
        if (!taskId) {
            return res.status(400).json({ message: "Task id is required" });
        }
        const objectId = new mongoose_1.default.Types.ObjectId(taskId);
        const task = yield task_model_1.default.findByIdAndDelete(objectId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteTaskController = deleteTaskController;
const updateTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, task } = req.body;
        console.log(req.body);
        if (!taskId) {
            return res.status(400).json({ message: "Task id is required" });
        }
        if (!task) {
            return res.status(400).json({ message: "Task data is required" });
        }
        const objectId = new mongoose_1.default.Types.ObjectId(taskId);
        const updatedTask = yield task_model_1.default.findByIdAndUpdate(objectId, task, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully" });
    }
    catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateTaskController = updateTaskController;
