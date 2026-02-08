import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getDashboardZones,
  getDashboardAlerts,
  getZoneAnalytics,
} from "../../services/dashboard.service";
import "./analytics.css";

const Analytics = () => {
  const [zones, setZones] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [zoneDetails, setZoneDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const zonesRes = await getDashboardZones();
        const alertsRes = await getDashboardAlerts();

        const zonesData = zonesRes?.data || [];
        const alertsData = alertsRes?.data || [];

        setZones(zonesData);
        setAlerts(alertsData);

        
        const chartDataFormatted = zonesData.map((zone) => ({
          name: zone.name.substring(0, 8),
          pressure: zone.pressure || 0,
          flow: zone.flowRate || 0,
          fullName: zone.name,
        }));
        setChartData(chartDataFormatted);

        
        const detailedZones = await Promise.all(
          zonesData.map(async (zone) => {
            try {
              const analyticsRes = await getZoneAnalytics(zone._id);
              const zoneAnalytics = analyticsRes?.data || {};
              return {
                _id: zone._id,
                name: zone.name,
                pressure: zone.pressure || 0,
                flowRate: zone.flowRate || 0,
                status: zone.status || "NORMAL",
                supply_status: zone.supply_status || "NORMAL",
                recentReadings: zoneAnalytics.recentReadings || [],
                alerts: zoneAnalytics.alerts || [],
              };
            } catch (error) {
              return {
                _id: zone._id,
                name: zone.name,
                pressure: zone.pressure || 0,
                flowRate: zone.flowRate || 0,
                status: zone.status || "NORMAL",
                supply_status: zone.supply_status || "NORMAL",
                recentReadings: [],
                alerts: [],
              };
            }
          })
        );
        setZoneDetails(detailedZones);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();

    const interval = setInterval(fetchAnalyticsData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading-state">Loading Analytics...</div>
      </div>
    );
  }

  const avgPressure =
    zones.length > 0
      ? (zones.reduce((sum, z) => sum + (z.pressure || 0), 0) / zones.length).toFixed(2)
      : 0;

  const avgFlow =
    zones.length > 0
      ? Math.round(zones.reduce((sum, z) => sum + (z.flowRate || 0), 0) / zones.length)
      : 0;

  const normalZones = zones.filter((z) => z.status === "NORMAL").length;
  const alertZones = zones.filter((z) => z.status !== "NORMAL").length;

  const statusData = [
    { name: "Normal", value: normalZones, color: "#10b981" },
    { name: "Alert", value: alertZones, color: "#ef4444" },
  ];

  const alertsBySeverity = {
    HIGH: alerts.filter((a) => a.severity === "HIGH").length,
    MEDIUM: alerts.filter((a) => a.severity === "MEDIUM").length,
    LOW: alerts.filter((a) => a.severity === "LOW").length,
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>System Analytics & Reports</h2>
        <p>Comprehensive water system monitoring and analysis</p>
      </div>

      <section className="metrics-section">
        <div className="metric-card">
          <h4>Avg Pressure</h4>
          <div className="metric-value">{avgPressure} <span>bar</span></div>
        </div>
        <div className="metric-card">
          <h4>Avg Flow Rate</h4>
          <div className="metric-value">{avgFlow} <span>L/min</span></div>
        </div>
        <div className="metric-card">
          <h4>Total Zones</h4>
          <div className="metric-value">{zones.length}</div>
        </div>
        <div className="metric-card">
          <h4>Active Alerts</h4>
          <div className="metric-value alert">{alerts.length}</div>
        </div>
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Pressure & Flow Comparison by Zone</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" label={{ value: "Pressure (bar)", angle: -90, position: "insideLeft" }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: "Flow (L/min)", angle: 90, position: "insideRight" }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="pressure" fill="#3b82f6" name="Pressure (bar)" />
              <Bar yAxisId="right" dataKey="flow" fill="#10b981" name="Flow (L/min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Zone Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="alerts-stats-section">
        <h3>Alert Statistics</h3>
        <div className="alert-stats">
          <div className="alert-stat-card high">
            <span className="severity-label">High</span>
            <span className="severity-value">{alertsBySeverity.HIGH}</span>
          </div>
          <div className="alert-stat-card medium">
            <span className="severity-label">Medium</span>
            <span className="severity-value">{alertsBySeverity.MEDIUM}</span>
          </div>
          <div className="alert-stat-card low">
            <span className="severity-label">Low</span>
            <span className="severity-value">{alertsBySeverity.LOW}</span>
          </div>
        </div>
      </section>

      <section className="zone-details-section">
        <h3>Zone-wise Details</h3>
        <div className="zones-grid">
          {zoneDetails.map((zone) => {
            const avgReadingPressure =
              zone.recentReadings.length > 0
                ? (
                    zone.recentReadings.reduce((sum, r) => sum + (r.pressure || 0), 0) /
                    zone.recentReadings.length
                  ).toFixed(2)
                : zone.pressure?.toFixed(2);

            const avgReadingFlow =
              zone.recentReadings.length > 0
                ? (
                    zone.recentReadings.reduce((sum, r) => sum + (r.flow || 0), 0) /
                    zone.recentReadings.length
                  ).toFixed(2)
                : zone.flowRate?.toFixed(2);

            const maxPressure =
              zone.recentReadings.length > 0
                ? Math.max(...zone.recentReadings.map((r) => r.pressure || 0)).toFixed(2)
                : "N/A";

            const minPressure =
              zone.recentReadings.length > 0
                ? Math.min(...zone.recentReadings.map((r) => r.pressure || 0)).toFixed(2)
                : "N/A";

            return (
              <div key={zone._id} className="zone-detail-card">
                <div className="zone-detail-header">
                  <h4>{zone.name}</h4>
                  <span className={`status-badge ${zone.status.toLowerCase()}`}>
                    {zone.status}
                  </span>
                </div>

                <div className="zone-metrics">
                  <div className="metric-row">
                    <span>Current Pressure:</span>
                    <strong>{zone.pressure?.toFixed(2)} bar</strong>
                  </div>
                  <div className="metric-row">
                    <span>Avg Pressure:</span>
                    <strong>{avgReadingPressure} bar</strong>
                  </div>
                  <div className="metric-row">
                    <span>Max Pressure:</span>
                    <strong>{maxPressure} bar</strong>
                  </div>
                  <div className="metric-row">
                    <span>Min Pressure:</span>
                    <strong>{minPressure} bar</strong>
                  </div>
                  <div className="metric-row">
                    <span>Current Flow:</span>
                    <strong>{zone.flowRate?.toFixed(2)} L/min</strong>
                  </div>
                  <div className="metric-row">
                    <span>Avg Flow:</span>
                    <strong>{avgReadingFlow} L/min</strong>
                  </div>
                  <div className="metric-row">
                    <span>Total Alerts:</span>
                    <strong className="alert-count">{zone.alerts.length}</strong>
                  </div>
                  <div className="metric-row">
                    <span>Readings Count:</span>
                    <strong>{zone.recentReadings.length}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Analytics;