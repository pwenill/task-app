import mongoose, { Document, mongo } from "mongoose";

interface ITasks extends Document {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export type { ITasks };
