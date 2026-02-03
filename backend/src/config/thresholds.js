// PRESSURE THRESHOLDS (in bar)

export const PRESSURE = {
  MIN_SAFE: 2.0,        // Below this → LOW_PRESSURE
  NORMAL_MIN: 2.5,      // Normal operating range start
  NORMAL_MAX: 3.5,      // Normal operating range end
  CRITICAL_LOW: 1.5     // Below this → CRITICAL
};

// FLOW THRESHOLDS (in L/min)

export const FLOW = {
  NORMAL_MIN: 250,
  NORMAL_MAX: 450,
  HIGH_FLOW: 500        // High flow with low pressure → LEAKAGE
};

// UNEVEN DISTRIBUTION THRESHOLD

export const DISTRIBUTION = {
  MAX_PRESSURE_DIFFERENCE: 1.0 // bar difference between zones
};

// ALERT SEVERITY RULES

export const SEVERITY_RULES = {
  LOW_PRESSURE: {
    LOW: 1.9,
    MEDIUM: 1.7,
    HIGH: 1.5
  },
  LEAKAGE: {
    FLOW_SPIKE: 520,
    PRESSURE_DROP: 1.6
  },
  UNEVEN_DISTRIBUTION: {
    MEDIUM: 1.0,
    HIGH: 1.5
  }
};


// SUPPLY STATUS MAPPING

export const SUPPLY_STATUS = {
  NORMAL: "NORMAL",
  WARNING: "WARNING",
  CRITICAL: "CRITICAL"
};


// ALERT TYPES

export const ALERT_TYPES = {
  LOW_PRESSURE: "LOW_PRESSURE",
  LEAKAGE: "LEAKAGE",
  UNEVEN_DISTRIBUTION: "UNEVEN_DISTRIBUTION"
};

// HELPER FUNCTION 

export const getSupplyStatusFromPressure = (pressure) => {
  if (pressure < PRESSURE.CRITICAL_LOW) return SUPPLY_STATUS.CRITICAL;
  if (pressure < PRESSURE.MIN_SAFE) return SUPPLY_STATUS.WARNING;
  return SUPPLY_STATUS.NORMAL;
};
