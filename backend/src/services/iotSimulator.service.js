/*
Functions

startSimulation()
stopSimulation()
generateNormalData(zoneId)
simulateLowPressure(zoneId)
simulateLeakage(zoneId)
simulateUnevenDistribution()

👉 Not exposed to frontend

*/ 


// services/iotSimulator.service.js

import axios from "axios";
import { PRESSURE, FLOW } from "../config/thresholds.js";

// Internal config
const SIMULATION_INTERVAL = 5000; // 5 seconds
let simulationTimer = null;

/**
 * Utility: generate random number in range
 */
const randomInRange = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

/**
 * Generate NORMAL sensor data
 */
const generateNormalData = (zoneId) => {
  return {
    zoneId,
    pressure: randomInRange(PRESSURE.NORMAL_MIN, PRESSURE.NORMAL_MAX),
    flow: randomInRange(FLOW.NORMAL_MIN, FLOW.NORMAL_MAX),
  };
};

/**
 * Simulate LOW PRESSURE
 */
const simulateLowPressure = (zoneId) => {
  return {
    zoneId,
    pressure: randomInRange(1.2, PRESSURE.MIN_SAFE - 0.1),
    flow: randomInRange(FLOW.NORMAL_MIN, FLOW.NORMAL_MAX),
  };
};

/**
 * Simulate LEAKAGE
 * Low pressure + high flow
 */
const simulateLeakage = (zoneId) => {
  return {
    zoneId,
    pressure: randomInRange(1.0, PRESSURE.MIN_SAFE - 0.2),
    flow: randomInRange(FLOW.HIGH_FLOW + 20, FLOW.HIGH_FLOW + 150),
  };
};

/**
 * Simulate UNEVEN DISTRIBUTION
 * Different pressure values across zones
 */
const simulateUnevenDistribution = (zones) => {
  return zones.map((zone, index) => ({
    zoneId: zone.id,
    pressure:
      index % 2 === 0
        ? randomInRange(3.2, 3.6) // High pressure
        : randomInRange(1.3, 1.7), // Low pressure
    flow: randomInRange(FLOW.NORMAL_MIN, FLOW.NORMAL_MAX),
  }));
};

/**
 * Push sensor data to backend ingestion API
 */
const pushSensorData = async (payload) => {
  try {
    await axios.post("http://localhost:6000/api/iot/data", payload);
  } catch (error) {
    console.error(" Failed to push sensor data", error.message);
  }
};

/**
 * Start NORMAL simulation
 */
export const startSimulation = (zones) => {
  if (simulationTimer) return;

  console.log(" IoT Simulation started (NORMAL mode)");

  simulationTimer = setInterval(async () => {
    for (const zone of zones) {
      const data = generateNormalData(zone.id);
      await pushSensorData(data);
    }
  }, SIMULATION_INTERVAL);
};

/**
 * Stop simulation
 */
export const stopSimulation = () => {
  if (simulationTimer) {
    clearInterval(simulationTimer);
    simulationTimer = null;
    console.log(" IoT Simulation stopped");
  }
};

/**
 * Trigger LOW PRESSURE manually (demo)
 */
export const triggerLowPressure = async (zoneId) => {
  console.log(` Low pressure triggered for zone ${zoneId}`);
  const data = simulateLowPressure(zoneId);
  await pushSensorData(data);
};

/**
 * Trigger LEAKAGE manually (demo)
 */
export const triggerLeakage = async (zoneId) => {
  console.log(` Leakage triggered for zone ${zoneId}`);
  const data = simulateLeakage(zoneId);
  await pushSensorData(data);
};

/**
 * Trigger UNEVEN DISTRIBUTION manually (demo)
 */
export const triggerUnevenDistribution = async (zones) => {
  console.log(" Uneven distribution triggered");
  const payloads = simulateUnevenDistribution(zones);

  for (const payload of payloads) {
    await pushSensorData(payload);
  }
};
