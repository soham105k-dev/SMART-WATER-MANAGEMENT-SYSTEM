import ZoneCard from './ZoneCard';
import './ZoneCard.css';

<<<<<<< HEAD
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
=======
const ZonalData = () => {
  const zonesData = [
    { ward: "Ward 1", pressure: "2.8", flowRate: "450", updated: "12:34" },
    { ward: "Akkalkot Road", pressure: "2.5", flowRate: "380", updated: "12:34" },
    { ward: "Vijapur Road", pressure: "2.9", flowRate: "520", updated: "12:34" },
    { ward: "Saatar Rasta", pressure: "2.6", flowRate: "410", updated: "12:34" },
    { ward: "Murari Peth", pressure: "3.0", flowRate: "390", updated: "12:34" },
    { ward: "Bhavani Peth", pressure: "2.4", flowRate: "360", updated: "12:34" },
  ];

  return (
    <div className="zonal-data">
      <h2 className="section-title">Zone Status</h2>
      <div className="zone-grid">
        {zonesData.map((zone, index) => (
          <ZoneCard 
            key={index}
            ward={zone.ward}
            pressure={zone.pressure}
            flowRate={zone.flowRate}
            updated={zone.updated}
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
          />
        ))}
      </div>
    </div>
  );
};

export default ZonalData;
