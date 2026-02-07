import Zone from "../models/zone.model.js";
import SensorData from "../models/sensorData.model.js";
import Alert from "../models/alert.model.js";
import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

export const getAllZones = async (req, res) => {
  try {
    const zones = await Zone.find({ isActive: true });

    const latestSensorData = await SensorData.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$zone_id",
          pressure: { $first: "$pressure" },
          flow: { $first: "$flow" },
          lastUpdated: { $first: "$createdAt" },
        },
      },
    ]);

    const sensorMap = {};
    latestSensorData.forEach((item) => {
      sensorMap[item._id.toString()] = item;
    });

    const response = zones.map((zone) => {
      const sensor = sensorMap[zone._id.toString()];

      return {
        _id: zone._id,
        name: zone.name,
        supply_status: zone.supply_status,
        status: zone.status || "NORMAL",
        pressure: sensor?.pressure ?? 0,
        flowRate: sensor?.flow ?? 0,
        lastUpdated: sensor?.lastUpdated ?? null,
      };
    });

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

export const getZoneAnalytics = async (req, res) => {
  try {
    const { zoneId } = req.params;

    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return errorResponse(res, "Zone not found", 404);
    }

    const recentReadings = await SensorData.find({ zone_id: zoneId })
      .sort({ createdAt: -1 })
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
          status: zone.status,
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
