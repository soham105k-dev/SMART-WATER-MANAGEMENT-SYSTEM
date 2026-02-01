//Purpose: Handle incoming IoT/simulated data


/*
Validate payload

Save sensor data

Call abnormality detection

Update zone status

*/ 
// controllers/iot.controller.js

import  Zone from "../models/zone.model.js";
import  SensorData  from "../models/sensorData.model.js";
import  Alert  from "../models/alert.model.js";

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

    //  Basic validation
    if (!zoneId || pressure == null || flow == null) {
      return errorResponse(
        res,
        "zoneId, pressure and flow are required",
        400
      );
    }

    // Check zone exists
    const zone = await Zone.findById(zoneId);
    if (!zone || !zone.isActive) {
      return errorResponse(res, "Invalid or inactive zone", 404);
    }

    //  Store sensor data
    const sensorData = await SensorData.create({
      zone_id: zoneId,
      pressure,
      flow,
    });

    // Fetch latest pressure of all zones (for uneven distribution)
    const latestReadings = await SensorData.aggregate([
      { $sort: { created_at: -1 } },
      {
        $group: {
          _id: "$zone_id",
          pressure: { $first: "$pressure" },
        },
      },
    ]);

    //  Evaluate abnormalities
    const abnormality = evaluateSensorData({
      pressure,
      flow,
      zonesPressureData: latestReadings.map((z) => ({
        zoneId: z._id,
        pressure: z.pressure,
      })),
    });

    //  Create alert if needed
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

    // Update zone supply status
    const supplyStatus = getSupplyStatus(pressure);
    zone.supply_status = supplyStatus;
    await zone.save();

    //  Response
    return successResponse(
      res,
      "Sensor data processed successfully",
      {
        zoneId,
        pressure,
        flow,
        supply_status: supplyStatus,
        alert: abnormality || null,
      }
    );
  } catch (error) {
    console.error("IoT Controller Error:", error);
    return errorResponse(res, "Failed to process sensor data", 500, error);
  }
};
