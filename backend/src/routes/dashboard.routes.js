// routes/dashboard.routes.js

import express from "express";
import {
  getAllZones,
  getActiveAlerts,
  getZoneAnalytics,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

/**
 * @route   GET /api/dashboard/zones
 * @desc    Get all zones with latest sensor data
 * @access  Admin / Dashboard
 */
router.get("/zones", getAllZones);

/**
 * @route   GET /api/dashboard/alerts
 * @desc    Get all active alerts
 * @access  Admin / Dashboard
 */
router.get("/alerts", getActiveAlerts);

/**
 * @route   GET /api/dashboard/zones/:zoneId
 * @desc    Get analytics for a specific zone
 * @access  Admin / Dashboard
 */
router.get("/zones/:zoneId", getZoneAnalytics);

export default router;
