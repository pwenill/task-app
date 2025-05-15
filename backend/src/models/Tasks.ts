import mongoose from "mongoose";
import { ITasks } from "../libs/interfaces";

const schema = new mongoose.Schema<ITasks>({
  id: { type: "String", required: true },
  title: { type: "String", required: true },
  description: { type: "String", required: true },
  status: { type: "String", enum: ["pending", "in-progress", "completed"] },
  priority: { type: "String", enum: ["low", "medium", "high"] },
  createdAt: { type: "Date", default: Date.now },
});

export default mongoose.model<ITasks>("Tasks", schema);
