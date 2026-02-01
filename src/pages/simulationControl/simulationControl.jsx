import SimulationControlPanel from "../../components/SimulationControlPanel";
import ZonalData from "../../components/ZonalData";
import AlertsPanel from "../../components/AlertsPanel"
import "./simulationControl.css";

const simulationControl = () => {
  return (
    <div> 
      <header>  
        <h2>Simulation Control</h2>
        <p>Hackathon demo panel - Simulate various water pressure scenarios</p>
      </header>

      <main>
        <section>
          <SimulationControlPanel />
        </section>
        <section className="instructions">
          <h2>Hackthon Demo Instructions</h2>
          <ul>
            <li>Click any simulation button to trigger the corresponding scenario</li>
            <li>Watch zone cards update in real-time with status changes</li>
            <li>Alerts will be generated automatically based on conditions</li>
            <li>Use "Reset System" to return to initial state</li>
          </ul>
        </section>
      </main>

      <div className="data-review">
        <div className="zonal-data">
          <ZonalData />
        </div>
        <div>
          <h2>Generated Alerts</h2>
          <AlertsPanel />
        </div>

      </div>
    </div>
  );
}

export default simulationControl;