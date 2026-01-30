import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedBy: {
      type: String, // ADMIN / MANAGER name
      default: "ADMIN",
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    completedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Task", TaskSchema);
