import express from "express";
import { receiveSensorData } from "../controllers/iot.controller.js";

const router = express.Router();

router.post("/iot/data", receiveSensorData);

export default router;
