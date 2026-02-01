import AlertsPanel from "../../components/AlertsPanel";
import "./alerts.css";

const alerts = () => {
  return (
    <>    
      <header className="alerts-header">   
        <h2>Alert Centre</h2>
        <p>Monitor and manage all system alerts.</p>
      </header>

      <section>
        <AlertsPanel />
      </section>

      <footer className="alerts-footer">
        <h3>Alert Types</h3>

      <div className="footer-item">
        <div className="alert-types">
          <div className="alert-low-pressure">
            <strong>Low Pressure</strong>
            <p>Triggered when pressure drops below safe levels, indicating potential supply issues.</p>
          </div>

          <div className="alert-leak-detected">
            <strong>Leak Detected</strong>
            <p>Sudden drop in pressure and flow indicates possible water leakage in the system.</p>
          </div>

          <div className="alert-unequal-distribution">
            <strong>Unequal Distribution</strong>
            <p>Significant variance in pressure across zones suggests distribution imbalance.</p>
          </div>
        </div>

          </div>

      </footer>
    </>

  );
}

export default alerts;