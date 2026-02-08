import { useState } from "react";
import ZoneCard from "./ZoneCard";
import ZoneDetailModal from "./ZoneDetailModal";
import "./ZonalData.css";
import "./ZoneCard.css";

const ZonalData = ({ zones = [], enableModal = true }) => {
  const [selectedZone, setSelectedZone] = useState(null);

  const handleCardClick = (zoneId) => {
    if (enableModal) {
      setSelectedZone(zoneId);
    }
  };

  const handleCloseModal = () => {
    setSelectedZone(null);
  };

  return (
    <>
      <div className="zonal-data">
        <h2 className="section-title">Zone Status</h2>

        <div className="zone-grid">
          {zones.map((zone, index) => (
            <ZoneCard
              key={zone._id || index}
              zoneId={zone._id}
              ward={zone.name}
              pressure={zone.pressure}
              flowRate={zone.flowRate}
              status={zone.status}
              updated={zone.lastUpdated}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {selectedZone && (
        <ZoneDetailModal
          zoneId={selectedZone}
          zoneName={zones.find(z => z._id === selectedZone)?.name || "Zone"}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ZonalData;
