import ZonalData from "../../components/ZonalData";
import "./zoneMonitoring.css";

const zoneMonitoring = () => {
  return (
  <>
    <section className="zoneMonitoring-header">
        <div className="zoneMonitoring-header-left">
          <h2>Zone Monitoring</h2>
          <p>Monitor water pressure and flow across all city zones.</p>
        </div>
        <div className="zoneMonitoring-header-right"> 
          <div className="header-item">
            <span className="item-label-normal">8 Normal</span>   
            <span className="item-label-warning">2 Warnings</span>   
            <span className="item-label-critical">1 Critical</span>   
          </div>
        </div>  
    </section>  

    <section className="zone-stat">
      <ZonalData />
    </section> 

    <section className="zoneMonitoring-footer">
      <h2>Status Legend</h2>

    
    <div className="footer-item">
      <div className="legend-color-normal">
        <h2>Normal (Green)</h2>
        <p>Pressure: 2.0 - 3.5 bar</p>
      </div>

      <div className="legend-color-warning">
        <h2>Warning (Amber)</h2>
        <p>Pressure: 1.5 - 2.0 bar</p>
      </div>

      <div className="legend-color-critical">
        <h2>Critical (Red)</h2>
        <p>Pressure: below 1.5 bar</p>
      </div>

      </div>
    </section>
  </> 
  );
}

export default zoneMonitoring;