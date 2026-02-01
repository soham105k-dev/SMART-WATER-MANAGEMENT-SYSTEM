// routes/iot.routes.js

import express from "express";
import { receiveSensorData } from "../controllers/iot.controller.js";

const router = express.Router();

/**
 * @route   POST /api/iot/data
 * @desc    Receive IoT sensor data (real or simulated)
 * @access  Internal / IoT Devices
 */
router.post("/data", receiveSensorData);

export default router;
