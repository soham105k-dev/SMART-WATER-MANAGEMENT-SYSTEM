<<<<<<< HEAD
// controllers/iot.controller.js

import Zone from "../models/zone.model.js";
import SensorData from "../models/sensorData.model.js";
import Alert from "../models/alert.model.js";
=======
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
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf

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

<<<<<<< HEAD
    // 1️⃣ Basic validation
=======
    //  Basic validation
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
    if (!zoneId || pressure == null || flow == null) {
      return errorResponse(
        res,
        "zoneId, pressure and flow are required",
        400
      );
    }

<<<<<<< HEAD
    // 2️⃣ Check zone exists
=======
    // Check zone exists
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
    const zone = await Zone.findById(zoneId);
    if (!zone || !zone.isActive) {
      return errorResponse(res, "Invalid or inactive zone", 404);
    }

<<<<<<< HEAD
    // 3️⃣ Store sensor data (HISTORY)
    await SensorData.create({
=======
    //  Store sensor data
    const sensorData = await SensorData.create({
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
      zone_id: zoneId,
      pressure,
      flow,
    });

<<<<<<< HEAD
    // 4️⃣ Fetch latest readings (for uneven distribution logic)
=======
    // Fetch latest pressure of all zones (for uneven distribution)
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
    const latestReadings = await SensorData.aggregate([
      { $sort: { created_at: -1 } },
      {
        $group: {
          _id: "$zone_id",
          pressure: { $first: "$pressure" },
        },
      },
    ]);

<<<<<<< HEAD
    // 5️⃣ Evaluate abnormalities
=======
    //  Evaluate abnormalities
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
    const abnormality = evaluateSensorData({
      pressure,
      flow,
      zonesPressureData: latestReadings.map((z) => ({
        zoneId: z._id,
        pressure: z.pressure,
      })),
    });

<<<<<<< HEAD
    // 6️⃣ Create alert if needed
=======
    //  Create alert if needed
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
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

<<<<<<< HEAD
    // 7️⃣ Update zone snapshot (🔥 THIS WAS MISSING 🔥)
    zone.pressure = pressure;          // 👈 REQUIRED for dashboard
    zone.flowRate = flow;              // 👈 REQUIRED for dashboard
    zone.lastUpdated = new Date();     // 👈 REQUIRED for UI timestamp
    zone.status = abnormality ? "ALERT" : "NORMAL";

    // 8️⃣ Update supply status
    zone.supply_status = getSupplyStatus(pressure);

    await zone.save();

    // 9️⃣ Response
=======
    // Update zone supply status
    const supplyStatus = getSupplyStatus(pressure);
    zone.supply_status = supplyStatus;
    await zone.save();

    //  Response
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
    return successResponse(
      res,
      "Sensor data processed successfully",
      {
        zoneId,
        pressure,
        flow,
<<<<<<< HEAD
        supply_status: zone.supply_status,
        status: zone.status,
=======
        supply_status: supplyStatus,
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
        alert: abnormality || null,
      }
    );
  } catch (error) {
    console.error("IoT Controller Error:", error);
    return errorResponse(res, "Failed to process sensor data", 500, error);
  }
};
