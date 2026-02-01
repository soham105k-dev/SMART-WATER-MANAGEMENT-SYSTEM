import "./StatCard.css";
import ZonalData from "./ZonalData";
import ZoneCard from "./ZoneCard";

const StatCard = ({ icon, title, value, unit, color }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>

      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">
          {value} <span>{unit}</span>
        </h2>
      </div>
    </div>
  );
};

export default StatCard;
