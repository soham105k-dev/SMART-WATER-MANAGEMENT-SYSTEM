import "./SimulationControlPanel.css";
import { GoTriangleRight } from "react-icons/go";
import { FiAlertTriangle, FiCircle } from "react-icons/fi";
import { FaScaleUnbalancedFlip } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { useState } from "react";
import {
  startSimulation,
  stopSimulation,
  triggerLowPressure,
  triggerLeakage,
  triggerUnevenDistribution,
} from "../services/dashboard.service";

const SimulationControlPanel = () => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleStartSimulation = async () => {
    setLoading(true);
    try {
      await startSimulation();
      setStatusMessage("✓ Simulation started - Normal Supply initialized");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error("Failed to start simulation:", error);
      setStatusMessage("✗ Failed to start simulation");
    }
    setLoading(false);
  };

  const handleLowPressure = async () => {
    setLoading(true);
    try {
      await triggerLowPressure("trigger-all");
      setStatusMessage("✓ Low Pressure scenario triggered");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error("Failed to trigger low pressure:", error);
      setStatusMessage("✗ Failed to trigger low pressure");
    }
    setLoading(false);
  };

  const handleLeakage = async () => {
    setLoading(true);
    try {
      await triggerLeakage("trigger-all");
      setStatusMessage("✓ Leakage scenario triggered");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error("Failed to trigger leakage:", error);
      setStatusMessage("✗ Failed to trigger leakage");
    }
    setLoading(false);
  };

  const handleUnevenDistribution = async () => {
    setLoading(true);
    try {
      await triggerUnevenDistribution();
      setStatusMessage("✓ Unequal Distribution scenario triggered");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error("Failed to trigger uneven distribution:", error);
      setStatusMessage("✗ Failed to trigger uneven distribution");
    }
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      await stopSimulation();
      setStatusMessage("✓ System reset - All alerts cleared");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error("Failed to reset system:", error);
      setStatusMessage("✗ Failed to reset system");
    }
    setLoading(false);
  };

  return (
    <div className="simulation-panel">
      <h2>Simulation Control Panel</h2>
      <p className="subtitle">
        Demo controls to simulate various water pressure scenarios. These controls will affect zone statuses and trigger alerts.
      </p>

      {statusMessage && (
        <div className="status-message">{statusMessage}</div>
      )}

      <div className="simulation-buttons">
        
        <button 
          className="sim-btn primary" 
          onClick={handleStartSimulation}
          disabled={loading}
        >
          <GoTriangleRight className="icon" />
          <div>
            <span className="title">Normal Supply</span>
            <span className="desc">Restore optimal conditions</span>
          </div>
        </button>

        <button 
          className="sim-btn primary"
          onClick={handleLowPressure}
          disabled={loading}
        >
          <FiAlertTriangle className="icon" />
          <div>
            <span className="title">Simulate Low Pressure</span>
            <span className="desc">Trigger pressure drop in zones</span>
          </div>
        </button>

        <button 
          className="sim-btn primary"
          onClick={handleLeakage}
          disabled={loading}
        >
          <FiCircle className="icon" />
          <div>
            <span className="title">Simulate Leakage</span>
            <span className="desc">Detect water loss scenario</span>
          </div>
        </button>

        <button 
          className="sim-btn primary"
          onClick={handleUnevenDistribution}
          disabled={loading}
        >
          <FaScaleUnbalancedFlip className="icon" />
          <div>
            <span className="title">Unequal Distribution</span>
            <span className="desc">Show imbalanced supply</span>
          </div>
        </button>

        <button 
          className="sim-btn reset"
          onClick={handleReset}
          disabled={loading}
        >
          <VscDebugRestart className="icon" />
          <div>
            <span className="title">Reset System</span>
            <span className="desc">Clear all alerts & restore</span>
          </div>
        </button>

      </div>
    </div>
  );
};

export default SimulationControlPanel;
