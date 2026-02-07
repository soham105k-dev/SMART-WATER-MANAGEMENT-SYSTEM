import Zone from "../models/zone.model.js";
import {
  startSimulation,
  stopSimulation,
} from "../services/iotSimulator.service.js";
import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

export const startIoTSimulation = async (req, res) => {
  try {
    const zones = await Zone.find({ isActive: true });

    if (!zones.length) {
      return errorResponse(res, "No active zones found", 404);
    }

    startSimulation(zones);

    return successResponse(
      res,
      "IoT simulation started successfully"
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to start IoT simulation",
      500,
      error
    );
  }
};

export const stopIoTSimulation = (req, res) => {
  try {
    stopSimulation();

    return successResponse(
      res,
      "IoT simulation stopped successfully"
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to stop IoT simulation",
      500,
      error
    );
  }
};
