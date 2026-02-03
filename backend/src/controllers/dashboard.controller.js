// controllers/dashboard.controller.js

import Zone from "../models/zone.model.js";
import SensorData from "../models/sensorData.model.js";
import Alert from "../models/alert.model.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

/**
<<<<<<< HEAD
 * GET /api/dashboard/zones
 * City-wide zone overview (LATEST SNAPSHOT)
 */
export const getAllZones = async (req, res) => {
  try {
    // 1️⃣ Fetch active zones
    const zones = await Zone.find({ isActive: true });

    // 2️⃣ Fetch latest sensor reading PER zone
    const latestSensorData = await SensorData.aggregate([
      { $sort: { createdAt: -1 } }, // ✅ correct timestamp field
=======
 * GET /dashboard/zones
 * City-wide zone overview
 */
export const getAllZones = async (req, res) => {
  try {
    const zones = await Zone.find({ isActive: true });

    const latestSensorData = await SensorData.aggregate([
      { $sort: { created_at: -1 } },
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
      {
        $group: {
          _id: "$zone_id",
          pressure: { $first: "$pressure" },
          flow: { $first: "$flow" },
<<<<<<< HEAD
          lastUpdated: { $first: "$createdAt" },
=======
          updatedAt: { $first: "$created_at" },
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
        },
      },
    ]);

<<<<<<< HEAD
    // 3️⃣ Convert aggregation result to lookup map
=======
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
    const sensorMap = {};
    latestSensorData.forEach((item) => {
      sensorMap[item._id.toString()] = item;
    });

<<<<<<< HEAD
    // 4️⃣ Build dashboard-safe response (frontend-ready)
    const response = zones.map((zone) => {
      const sensor = sensorMap[zone._id.toString()];

      return {
        _id: zone._id,
        name: zone.name,
        supply_status: zone.supply_status,
        status: zone.status || "NORMAL",

        // ✅ frontend EXPECTS these exact keys
        pressure: sensor?.pressure ?? 0,
        flowRate: sensor?.flow ?? 0,
        lastUpdated: sensor?.lastUpdated ?? null,
      };
    });
=======
    const response = zones.map((zone) => ({
      zoneId: zone._id,
      name: zone.name,
      supply_status: zone.supply_status,
      latestPressure: sensorMap[zone._id]?.pressure || null,
      latestFlow: sensorMap[zone._id]?.flow || null,
      lastUpdated: sensorMap[zone._id]?.updatedAt || null,
    }));
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf

    return successResponse(
      res,
      "Zones fetched successfully",
      response
    );
  } catch (error) {
    console.error("Dashboard Zones Error:", error);
    return errorResponse(res, "Failed to fetch zones", 500, error);
  }
};

/**
<<<<<<< HEAD
 * GET /api/dashboard/alerts
=======
 * GET /dashboard/alerts
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
 * Fetch all ACTIVE alerts
 */
export const getActiveAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ status: "ACTIVE" })
      .sort({ severity: -1, submitted_at: -1 })
      .populate("zone_id", "name");

    const response = alerts.map((alert) => ({
      alertId: alert._id,
      zoneName: alert.zone_id?.name || "Unknown",
      type: alert.type,
      severity: alert.severity,
      message: alert.message,
      submitted_at: alert.submitted_at,
    }));

    return successResponse(
      res,
      "Active alerts fetched successfully",
      response
    );
  } catch (error) {
    console.error("Dashboard Alerts Error:", error);
    return errorResponse(res, "Failed to fetch alerts", 500, error);
  }
};

/**
<<<<<<< HEAD
 * GET /api/dashboard/zones/:zoneId
=======
 * GET /dashboard/zones/:zoneId
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
 * Detailed analytics for a specific zone
 */
export const getZoneAnalytics = async (req, res) => {
  try {
    const { zoneId } = req.params;

    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return errorResponse(res, "Zone not found", 404);
    }

    const recentReadings = await SensorData.find({ zone_id: zoneId })
<<<<<<< HEAD
      .sort({ createdAt: -1 })
=======
      .sort({ created_at: -1 })
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
      .limit(20);

    const alerts = await Alert.find({ zone_id: zoneId })
      .sort({ submitted_at: -1 })
      .limit(10);

    return successResponse(
      res,
      "Zone analytics fetched successfully",
      {
        zone: {
          zoneId: zone._id,
          name: zone.name,
          supply_status: zone.supply_status,
<<<<<<< HEAD
          status: zone.status,
=======
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
        },
        recentReadings,
        alerts,
      }
    );
  } catch (error) {
    console.error("Zone Analytics Error:", error);
    return errorResponse(res, "Failed to fetch zone analytics", 500, error);
  }
};
