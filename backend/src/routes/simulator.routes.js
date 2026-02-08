import express from "express";
import Zone from "../models/zone.model.js";
import {
  startIoTSimulation,
  stopIoTSimulation,
} from "../controllers/simulator.controller.js";

import {
  triggerLowPressure,
  triggerLeakage,
  triggerUnevenDistribution,
} from "../services/iotSimulator.service.js";

const router = express.Router();

router.post("/start", startIoTSimulation);
router.post("/stop", stopIoTSimulation);

router.post("/trigger/low-pressure/:zoneId", async (req, res) => {
  await triggerLowPressure(req.params.zoneId);
  res.json({ success: true, message: "Low pressure triggered" });
});


router.post("/trigger/leakage/:zoneId", async (req, res) => {
  await triggerLeakage(req.params.zoneId);
  res.json({ success: true, message: "Leakage triggered" });
});


router.post("/trigger/uneven", async (req, res) => {
  const zones = await Zone.find({ isActive: true });
  await triggerUnevenDistribution(zones);
  res.json({ success: true, message: "Uneven distribution triggered" });
});

export default router;