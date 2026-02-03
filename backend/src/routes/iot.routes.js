<<<<<<< HEAD
=======
// routes/iot.routes.js

>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
import express from "express";
import { receiveSensorData } from "../controllers/iot.controller.js";

const router = express.Router();

<<<<<<< HEAD
router.post("/iot/data", receiveSensorData);
=======
/**
 * @route   POST /api/iot/data
 * @desc    Receive IoT sensor data (real or simulated)
 * @access  Internal / IoT Devices
 */
router.post("/data", receiveSensorData);
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf

export default router;
