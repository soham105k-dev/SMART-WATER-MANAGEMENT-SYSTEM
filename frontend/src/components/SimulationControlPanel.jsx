import "./SimulationControlPanel.css";
import { GoTriangleRight } from "react-icons/go";
import { FiAlertTriangle, FiCircle } from "react-icons/fi";
import { FaScaleUnbalancedFlip } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";

const SimulationControlPanel = () => {
  return (
    <div className="simulation-panel">
      <h2>Simulation Control Panel</h2>
      <p className="subtitle">
        Demo controls to simulate various water pressure scenarios. These controls will affect zone statuses and trigger alerts.
      </p>

      <div className="simulation-buttons">
        
        <button className="sim-btn primary">
          <GoTriangleRight className="icon" />
          <div>
            <span className="title">Normal Supply</span>
            <span className="desc">Restore optimal conditions</span>
          </div>
        </button>

        <button className="sim-btn primary">
          <FiAlertTriangle className="icon" />
          <div>
            <span className="title">Simulate Low Pressure</span>
            <span className="desc">Trigger pressure drop in zones</span>
          </div>
        </button>

        <button className="sim-btn primary">
          <FiCircle className="icon" />
          <div>
            <span className="title">Simulate Leakage</span>
            <span className="desc">Detect water loss scenario</span>
          </div>
        </button>

        <button className="sim-btn primary">
          <FaScaleUnbalancedFlip className="icon" />
          <div>
            <span className="title">Unequal Distribution</span>
            <span className="desc">Show imbalanced supply</span>
          </div>
        </button>

        <button className="sim-btn reset">
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
