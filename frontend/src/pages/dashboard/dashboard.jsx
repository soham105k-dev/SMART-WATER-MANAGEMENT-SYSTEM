import DashboardStats from "../../components/DashboardStats";
import ZonalData from "../../components/ZonalData";
import AlertsPanel from "../../components/AlertsPanel";
import "./dashboard.css";

import { useEffect, useState } from "react";
import {
  getDashboardZones,
  getDashboardAlerts,
} from "../../services/dashboard.service";

const Dashboard = () => {
  const [zones, setZones] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const zonesRes = await getDashboardZones();
        const alertsRes = await getDashboardAlerts();

        // Extract data from response - response.data property contains the zones/alerts array
        setZones(zonesRes?.data || []);
        setAlerts(alertsRes?.data || []);
      } catch (error) {
        console.error("Dashboard API error:", error);
      }
    };

    fetchDashboardData();

    // Auto-refresh every 3 seconds for real-time updates
    const interval = setInterval(fetchDashboardData, 3000);
    return () => clearInterval(interval);
  }, []);

  // =========================
  // DASHBOARD CALCULATIONS
  // =========================

  const avgPressure =
    zones.length > 0
      ? (
          zones.reduce(
            (sum, z) => sum + (z.pressure || 0),
            0
          ) / zones.length
        ).toFixed(2)
      : 0;

  const avgFlow =
    zones.length > 0
      ? Math.round(
          zones.reduce(
            (sum, z) => sum + (z.flowRate || 0),
            0
          ) / zones.length
        )
      : 0;

  const activeAlerts = alerts.length;

  const zonesNormal =
    zones.length > 0
      ? `${zones.filter(z => z.status === "NORMAL").length}/${zones.length}`
      : "0/0";

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Real time water pressure monitoring for Solapur City</p>
      </div>


      <DashboardStats
        avgPressure={avgPressure}
        avgFlow={avgFlow}
        activeAlerts={activeAlerts}
        zonesNormal={zonesNormal}
      />

      <ZonalData zones={zones} enableModal={false} />

      {/* Show alerts summary on dashboard */}
      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Active Alerts</h2>
        <AlertsPanel alerts={alerts} />
      </section>

    </div>
  );
};

export default Dashboard;