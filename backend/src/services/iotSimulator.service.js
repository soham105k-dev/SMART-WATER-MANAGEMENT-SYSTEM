import axios from "axios";
import { PRESSURE, FLOW } from "../config/thresholds.js";

const SIMULATION_INTERVAL = 1 * 60 * 1000;
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

let simulationTimer = null;

const randomInRange = (min, max) =>
  Number((Math.random() * (max - min) + min).toFixed(2));

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
    pressure: index % 2 === 0 ? randomInRange(3.2, 3.6) : randomInRange(1.3, 1.7),
    flow: randomInRange(FLOW.NORMAL_MIN, FLOW.NORMAL_MAX),
  }));

const pushSensorData = async (payload) => {
  try {
    await axios.post(`${API_BASE_URL}/api/iot/data`, payload);
  } catch (error) {
    console.error(
      "Failed to push sensor data:",
      error.response?.data || error.message
    );
  }
};

export const startSimulation = async (zones) => {
  if (simulationTimer) return;

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
  }, SIMULATION_INTERVAL);
};

export const stopSimulation = () => {
  if (simulationTimer) {
    clearInterval(simulationTimer);
    simulationTimer = null;
  }
};

export const triggerLowPressure = async (zoneId) => {
  await pushSensorData(simulateLowPressure(zoneId));
};

export const triggerLeakage = async (zoneId) => {
  await pushSensorData(simulateLeakage(zoneId));
};

export const triggerUnevenDistribution = async (zones) => {
  const payloads = simulateUnevenDistribution(zones);
  await Promise.all(payloads.map(pushSensorData));
};
