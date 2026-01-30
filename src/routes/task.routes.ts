// import express from "express";
// import {
//   assignTask,
//   getMyTasks,
//   completeTask,
//   getTasksByUser,
//   getAllTasks,
// } from "../controllers/task.controller.js";

// const router = express.Router();

// /* dashboard */
// router.post("/assign", assignTask);
// router.get("/user/:userId", getTasksByUser);

// /* mobile app */
// router.get("/my", getMyTasks);
// router.post("/:taskId/complete", completeTask);

// /* ✅ DASHBOARD */
// router.get("/", getAllTasks);

// export default router;

import express from "express";
import {
  assignTask,
  getUserPendingTasks,
  completeTask,
  getAllTasks,
} from "../controllers/task.controller.js";

const router = express.Router();

/* ADMIN */
router.post("/assign", assignTask);
router.get("/all", getAllTasks);

/* MOBILE USER */
router.get("/user/:userId", getUserPendingTasks);
router.post("/:taskId/complete", completeTask);

export default router;
