import express from "express";
import {
  getAllZones,
  getActiveAlerts,
  getZoneAnalytics,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/zones", getAllZones);
router.get("/alerts", getActiveAlerts);
router.get("/zones/:zoneId", getZoneAnalytics);

export default router;
