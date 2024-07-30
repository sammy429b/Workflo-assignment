import { Request, Response } from "express";
import Task from "../models/task.model";
import mongoose from "mongoose";


export const getAllTasksController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        console.log(req.body);

        // Validate the userId
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     return res.status(400).json({ message: "Invalid user ID" });
        // }

        // Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        // Perform aggregation with additional stages for debugging
        const tasks = await Task.aggregate([
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
    } catch (error) {
        console.error("Error fetching tasks:", error); // Log detailed error
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const addNewTaskController = async (req: Request, res: Response) => {
    try {
        const { title, status, priority, deadline, description, details,userId } = req.body;

        console.log(req.body);
        if (!title || !status || !priority || !deadline || !description || !details) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(!userId){
            return res.status(200).json({message:"userID required"});
        }
        const objectId = new mongoose.Types.ObjectId(userId)

        const task = new Task({
            title,
            status,
            priority,
            deadline,
            description,
            details,
            userId

        });
        await task.save();
        res.status(200).json({ message: "new task stored successfully" });
    } catch (error) {
        console.log("error in new task storing", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}