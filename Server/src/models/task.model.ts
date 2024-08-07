import mongoose, { Document, model, Schema } from "mongoose";

export interface TaskSchemaType extends Document {
  title: string;
  status: "to do" | "in progress" | "under review" | "completed";
  priority: "low" | "medium" | "urgent";
  deadline: string;
  description: string;
  details: string;
  userId: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<TaskSchemaType>({
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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Task = model<TaskSchemaType>("Task", taskSchema);

export default Task;
