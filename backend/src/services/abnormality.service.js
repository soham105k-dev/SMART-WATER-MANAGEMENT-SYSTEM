import {
  PRESSURE,
  FLOW,
  DISTRIBUTION,
  ALERT_TYPES,
  SUPPLY_STATUS,
} from "../config/thresholds.js";

/**
 * Detect low pressure condition
 */
export const detectLowPressure = (pressure) => {
  return pressure < PRESSURE.MIN_SAFE;
};

/**
 * Detect leakage condition
 * Low pressure + high flow
 */
export const detectLeakage = (pressure, flow) => {
  return (
    pressure < PRESSURE.MIN_SAFE &&
    flow > FLOW.HIGH_FLOW
  );
};

/**
 * Detect uneven water distribution across zones
 * Compares max and min pressure values
 */
export const detectUnevenDistribution = (zonesPressureData) => {
  if (!zonesPressureData || zonesPressureData.length < 2) return false;

  const pressures = zonesPressureData.map((z) => z.pressure);
  const maxPressure = Math.max(...pressures);
  const minPressure = Math.min(...pressures);

  return (
    maxPressure - minPressure >
    DISTRIBUTION.MAX_PRESSURE_DIFFERENCE
  );
};

/**
 * Calculate alert severity
 */
export const calculateSeverity = (type, { pressure, flow, diff }) => {
  switch (type) {
    case ALERT_TYPES.LOW_PRESSURE:
      if (pressure <= 1.5) return "HIGH";
      if (pressure <= 1.8) return "MEDIUM";
      return "LOW";

    case ALERT_TYPES.LEAKAGE:
      if (flow > 600) return "HIGH";
      if (flow > 520) return "MEDIUM";
      return "LOW";

    case ALERT_TYPES.UNEVEN_DISTRIBUTION:
      if (diff > 1.5) return "HIGH";
      if (diff > 1.0) return "MEDIUM";
      return "LOW";

    default:
      return "LOW";
  }
};

/**
 * Get supply status from pressure value
 */
export const getSupplyStatus = (pressure) => {
  if (pressure < PRESSURE.CRITICAL_LOW) {
    return SUPPLY_STATUS.CRITICAL;
  }

  if (pressure < PRESSURE.MIN_SAFE) {
    return SUPPLY_STATUS.WARNING;
  }

  return SUPPLY_STATUS.NORMAL;
};

/**
 * Main evaluation function
 * Decides if alert should be created
 */
export const evaluateSensorData = ({
  pressure,
  flow,
  zonesPressureData = [],
}) => {
  //  Leakage check (highest priority)
  if (detectLeakage(pressure, flow)) {
    return {
      type: ALERT_TYPES.LEAKAGE,
      severity: calculateSeverity(ALERT_TYPES.LEAKAGE, { flow }),
      message: "Possible leakage detected due to low pressure and high flow",
    };
  }

  //  Low pressure check
  if (detectLowPressure(pressure)) {
    return {
      type: ALERT_TYPES.LOW_PRESSURE,
      severity: calculateSeverity(ALERT_TYPES.LOW_PRESSURE, { pressure }),
      message: "Low water pressure detected in the zone",
    };
  }

  //  Uneven distribution check (city-wide)
  if (detectUnevenDistribution(zonesPressureData)) {
    const pressures = zonesPressureData.map((z) => z.pressure);
    const diff = Math.max(...pressures) - Math.min(...pressures);

    return {
      type: ALERT_TYPES.UNEVEN_DISTRIBUTION,
      severity: calculateSeverity(
        ALERT_TYPES.UNEVEN_DISTRIBUTION,
        { diff }
      ),
      message: "Uneven water distribution detected across zones",
    };
  }

  //  No abnormality
  return null;
};
