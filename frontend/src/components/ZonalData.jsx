import ZoneCard from './ZoneCard';
import './ZoneCard.css';

const ZonalData = ({ zones = [] }) => {
  return (
    <div className="zonal-data">
      <h2 className="section-title">Zone Status</h2>

      <div className="zone-grid">
        {zones.map((zone, index) => (
          <ZoneCard
            key={zone._id || index}
            ward={zone.name || zone.ward}
            pressure={zone.pressure}
            flowRate={zone.flow || zone.flowRate}
            updated={zone.lastUpdated || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default ZonalData;
