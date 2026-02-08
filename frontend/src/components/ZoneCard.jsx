import "./ZoneCard.css";
import { FiCircle, FiCheckCircle } from "react-icons/fi";

const ZoneCard = ({ 
  zoneId,
  ward, 
  pressure, 
  flowRate, 
  status = "Normal", 
  updated,
  onCardClick
}) => {
  const getStatusColor = (status) => {
    switch(status?.toUpperCase()) {
      case "CRITICAL":
        return "critical";
      case "WARNING":
        return "warning";
      case "ALERT":
        return "alert";
      default:
        return "normal";
    }
  };

  return (
  <div 
    className="zone-grid"
    onClick={() => onCardClick && onCardClick(zoneId)}
    style={{ cursor: "pointer" }}
  >
    <div className="zone-card">
      <div className="zone-header">
        <h3 className="zone-name">{ward}</h3>
        <div className={`status-indicator ${getStatusColor(status)}`}>
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
        <span className="updated-text">Updated {updated ? new Date(updated).toLocaleTimeString() : "N/A"}</span>
      </div>
    </div>
  </div>
  );
};

export default ZoneCard;
