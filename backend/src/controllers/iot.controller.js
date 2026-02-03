// controllers/iot.controller.js

import Zone from "../models/zone.model.js";
import SensorData from "../models/sensorData.model.js";
import Alert from "../models/alert.model.js";

import {
  evaluateSensorData,
  getSupplyStatus,
} from "../services/abnormality.service.js";

import {
  ALERT_TYPES,
  SUPPLY_STATUS,
} from "../config/thresholds.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

/**
 * Receive IoT sensor data (simulated or real)
 * POST /api/iot/data
 */
export const receiveSensorData = async (req, res) => {
  try {
    const { zoneId, pressure, flow } = req.body;

    // 1️⃣ Basic validation
    if (!zoneId || pressure == null || flow == null) {
      return errorResponse(
        res,
        "zoneId, pressure and flow are required",
        400
      );
    }

    // 2️⃣ Check zone exists
    const zone = await Zone.findById(zoneId);
    if (!zone || !zone.isActive) {
      return errorResponse(res, "Invalid or inactive zone", 404);
    }

    // 3️⃣ Store sensor data (HISTORY)
    await SensorData.create({
      zone_id: zoneId,
      pressure,
      flow,
    });

    // 4️⃣ Fetch latest readings (for uneven distribution logic)
    const latestReadings = await SensorData.aggregate([
      { $sort: { created_at: -1 } },
      {
        $group: {
          _id: "$zone_id",
          pressure: { $first: "$pressure" },
        },
      },
    ]);

    // 5️⃣ Evaluate abnormalities
    const abnormality = evaluateSensorData({
      pressure,
      flow,
      zonesPressureData: latestReadings.map((z) => ({
        zoneId: z._id,
        pressure: z.pressure,
      })),
    });

    // 6️⃣ Create alert if needed
    if (abnormality) {
      await Alert.create({
        zone_id: zoneId,
        type: abnormality.type,
        severity: abnormality.severity,
        status: "ACTIVE",
        message: abnormality.message,
        submitted_at: new Date(),
      });
    }

    // 7️⃣ Update zone snapshot (🔥 THIS WAS MISSING 🔥)
    zone.pressure = pressure;          // 👈 REQUIRED for dashboard
    zone.flowRate = flow;              // 👈 REQUIRED for dashboard
    zone.lastUpdated = new Date();     // 👈 REQUIRED for UI timestamp
    zone.status = abnormality ? "ALERT" : "NORMAL";

    // 8️⃣ Update supply status
    zone.supply_status = getSupplyStatus(pressure);

    await zone.save();

    // 9️⃣ Response
    return successResponse(
      res,
      "Sensor data processed successfully",
      {
        zoneId,
        pressure,
        flow,
        supply_status: zone.supply_status,
        status: zone.status,
        alert: abnormality || null,
      }
    );
  } catch (error) {
    console.error("IoT Controller Error:", error);
    return errorResponse(res, "Failed to process sensor data", 500, error);
  }
};
