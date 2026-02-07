
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

export const receiveSensorData = async (req, res) => {
  try {
    const { zoneId, pressure, flow } = req.body;

    if (!zoneId || pressure == null || flow == null) {
      return errorResponse(
        res,
        "zoneId, pressure and flow are required",
        400
      );
    }

    const zone = await Zone.findById(zoneId);
    if (!zone || !zone.isActive) {
      return errorResponse(res, "Invalid or inactive zone", 404);
    }

    await SensorData.create({
      zone_id: zoneId,
      pressure,
      flow,
    });

    const latestReadings = await SensorData.aggregate([
      { $sort: { created_at: -1 } },
      {
        $group: {
          _id: "$zone_id",
          pressure: { $first: "$pressure" },
        },
      },
    ]);

    const abnormality = evaluateSensorData({
      pressure,
      flow,
      zonesPressureData: latestReadings.map((z) => ({
        zoneId: z._id,
        pressure: z.pressure,
      })),
    });

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

    zone.pressure = pressure;
    zone.flowRate = flow;
    zone.lastUpdated = new Date();
    zone.status = abnormality ? "ALERT" : "NORMAL";
    zone.supply_status = getSupplyStatus(pressure);

    await zone.save();

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
