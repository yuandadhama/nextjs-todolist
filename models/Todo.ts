import mongoose, { Schema, Model } from "mongoose";

export interface ITodo {
  _id?: string;
  name: string;
  description: string;
  time: string; // format hh:mm
  isCompleted: boolean;
  date: string; // Format: YYYY-MM-DD
  userId: string; // Foreign key to User
}

const TodoSchema = new Schema<ITodo>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true }, // e.g., "14:00"
  isCompleted: { type: Boolean, default: false },
  date: { type: String, required: true }, // e.g., "2025-02-22"
  userId: { type: String, required: true, ref: "User" }, // Reference to User
});

const Todo: Model<ITodo> =
  mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;
