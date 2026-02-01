import "./ZoneCard.css";
import { FiCircle, FiCheckCircle } from "react-icons/fi";

const ZoneCard = ({ 
  ward, 
  pressure, 
  flowRate, 
  pressureStatus = "Normal", 
  flowStatus = "Normal",
  updated 
}) => {
  return (
  <div className="zone-grid">
    <div className="zone-card">
      <div className="zone-header">
        <h3 className="zone-name">{ward}</h3>
        <div className="status-indicator normal">
          <FiCircle />
        </div>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-icon">P</div>
          <div className="metric-value">
            <span className="metric-number">{pressure}</span>
            <span className="metric-unit">bar</span>
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-icon">F</div>
          <div className="metric-value">
            <span className="metric-number">{flowRate}</span>
            <span className="metric-unit">L/min</span>
          </div>
        </div>
      </div>
      
      <div className="zone-footer">
        <span className="updated-text">Updated {updated}</span>
      </div>
    </div>
  </div>
  );
};

export default ZoneCard;
