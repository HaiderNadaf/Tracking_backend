import { Router } from "express";
import {
  startTracking,
  autoSavePoint,
  syncOfflinePoints,
  stopTracking,
  getTodayAllTracking,
  getUserDayTracking,
  getUserTodayTrackingById,
  getAllUsersTrackingHistory,
  getUserLatestTrackingById,
  getTrackingBySessionId,
} from "../controllers/tracking.controller.js";

import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/start", requireAuth, startTracking);
router.post("/auto-point", requireAuth, autoSavePoint);
router.post("/sync", requireAuth, syncOfflinePoints);
router.post("/stop", requireAuth, stopTracking);

// ✅ DASHBOARD
router.get("/today", getTodayAllTracking);
router.get("/day", getUserDayTracking);
router.get("/history", getAllUsersTrackingHistory);
router.get("/user/:userId", getUserLatestTrackingById);
router.get("/session/:sessionId", getTrackingBySessionId);

// USER DETAILS
router.get("/user/:userId", getUserTodayTrackingById);

export default router;
