import ZonalData from "../../components/ZonalData";
import "./zoneMonitoring.css";
import { useEffect, useState } from "react";
import { getDashboardZones } from "../../services/dashboard.service";

const ZoneMonitoring = () => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
  try {
    const res = await getDashboardZones();
    console.log("FULL API RESPONSE:", res);

    // Extract zones from response - res is already the response body
    const zonesFromApi = res?.data || [];

    console.log("ZONES EXTRACTED:", zonesFromApi);
    setZones(zonesFromApi);
  } catch (error) {
    console.error("Zone Monitoring fetch error:", error);
  }
};

    fetchZones();

    // 🔁 Auto-refresh every 3 seconds for real-time updates
    const interval = setInterval(fetchZones, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="zoneMonitoring-header">
        <div className="zoneMonitoring-header-left">
          <h2>Zone Monitoring</h2>
          <p>Monitor water pressure and flow across all city zones.</p>
        </div>

        <div className="zoneMonitoring-header-right">
          <div className="header-item">
            <span className="item-label-normal">
              {zones.filter(z => z.status === "NORMAL").length} Normal
            </span>
            <span className="item-label-warning">
              {zones.filter(z => z.status === "WARNING").length} Warnings
            </span>
            <span className="item-label-critical">
              {zones.filter(z => z.status === "CRITICAL").length} Critical
            </span>
          </div>
        </div>
      </section>

      <section className="zone-stat">
        {/* ✅ PASS LIVE DATA */}
        <ZonalData zones={zones} />
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
};

export default ZoneMonitoring;
