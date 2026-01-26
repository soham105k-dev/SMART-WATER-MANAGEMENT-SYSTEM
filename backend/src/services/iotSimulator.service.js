/*
Functions available:

startSimulation(zones)
stopSimulation()
triggerLowPressure(zoneId)
triggerLeakage(zoneId)
triggerUnevenDistribution(zones)

⚠️ Internal use only (NOT exposed to frontend)
*/

import axios from "axios";
import { PRESSURE, FLOW } from "../config/thresholds.js";

// ==========================
// CONFIG
// ==========================
const SIMULATION_INTERVAL = 1 * 60 * 1000; // 1 minute
const API_BASE_URL = "http://localhost:6000";

let simulationTimer = null;

// ==========================
// UTILITIES
// ==========================
const randomInRange = (min, max) =>
  Number((Math.random() * (max - min) + min).toFixed(2));

// ==========================
// DATA GENERATORS
// ==========================
const generateNormalData = (zoneId) => ({
  zoneId,
  pressure: randomInRange(PRESSURE.NORMAL_MIN, PRESSURE.NORMAL_MAX),
  flow: randomInRange(FLOW.NORMAL_MIN, FLOW.NORMAL_MAX),
});

const simulateLowPressure = (zoneId) => ({
  zoneId,
  pressure: randomInRange(1.2, PRESSURE.MIN_SAFE - 0.1),
  flow: randomInRange(FLOW.NORMAL_MIN, FLOW.NORMAL_MAX),
});

const simulateLeakage = (zoneId) => ({
  zoneId,
  pressure: randomInRange(1.0, PRESSURE.MIN_SAFE - 0.2),
  flow: randomInRange(FLOW.HIGH_FLOW + 20, FLOW.HIGH_FLOW + 150),
});

const simulateUnevenDistribution = (zones) =>
  zones.map((zone, index) => ({
    zoneId: zone._id.toString(),
    pressure:
      index % 2 === 0
        ? randomInRange(3.2, 3.6) // High pressure
        : randomInRange(1.3, 1.7), // Low pressure
    flow: randomInRange(FLOW.NORMAL_MIN, FLOW.NORMAL_MAX),
  }));

// ==========================
// PUSH TO BACKEND
// ==========================
const pushSensorData = async (payload) => {
  try {
    await axios.post(`${API_BASE_URL}/api/iot/data`, payload);
  } catch (error) {
    console.error(" Failed to push sensor data:", error.message);
  }
};

// ==========================
// SIMULATION CONTROLS
// ==========================
export const startSimulation = async (zones) => {
  if (simulationTimer) return;

  console.log(" IoT Simulation started (every 1 minute)");

  await Promise.all(
    zones.map((zone) =>
      pushSensorData(generateNormalData(zone._id.toString()))
    )
  );

  simulationTimer = setInterval(async () => {
    await Promise.all(
      zones.map((zone) =>
        pushSensorData(generateNormalData(zone._id.toString()))
      )
    );
    console.log(" Sensor data pushed at:", new Date().toLocaleTimeString());
  }, SIMULATION_INTERVAL);
};


export const stopSimulation = () => {
  if (simulationTimer) {
    clearInterval(simulationTimer);
    simulationTimer = null;
    console.log(" IoT Simulation stopped");
  }
};

// ==========================
// MANUAL DEMO TRIGGERS
// ==========================
export const triggerLowPressure = async (zoneId) => {
  console.log(` Low pressure triggered for zone ${zoneId}`);
  await pushSensorData(simulateLowPressure(zoneId));
};

export const triggerLeakage = async (zoneId) => {
  console.log(` Leakage triggered for zone ${zoneId}`);
  await pushSensorData(simulateLeakage(zoneId));
};

export const triggerUnevenDistribution = async (zones) => {
  console.log(" Uneven distribution triggered");

  const payloads = simulateUnevenDistribution(zones);
  await Promise.all(payloads.map(pushSensorData));
};
