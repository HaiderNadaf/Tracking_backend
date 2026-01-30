import Task from "../models/Task.model.js";

/* ================= ASSIGN TASK (DASHBOARD) ================= */

/* ================= ASSIGN TASK ================= */
export const assignTask = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ message: "userId and title required" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo: userId,
      assignedBy: "ADMIN",
    });

    res.json(task);
  } catch (err) {
    console.error("ASSIGN TASK ERROR:", err);
    res.status(500).json({ message: "Assign task failed" });
  }
};

/* ================= USER: GET MY TASKS ================= */
export const getMyTasks = async (req, res) => {
  try {
    const { userId } = req.params; // ✅ FROM URL PARAM

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const tasks = await Task.find({
      assignedTo: userId,
      status: "pending",
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("GET MY TASKS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= USER: COMPLETE TASK ================= */
export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    await Task.findByIdAndUpdate(taskId, {
      status: "completed",
      completedAt: new Date(),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("COMPLETE TASK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DASHBOARD: USER TASK HISTORY ================= */
export const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.find({ assignedTo: userId }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (err) {
    console.error("GET TASK ERROR:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { userId, status } = req.query;

    const filter: any = {};

    if (userId) filter.assignedTo = userId;
    if (status) filter.status = status; // pending | completed

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name phone") // if you have User model
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("GET ALL TASKS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserPendingTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ message: "UserId is required" });

    const tasks = await Task.find({
      assignedTo: userId,
      status: "pending",
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("GET USER TASKS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
