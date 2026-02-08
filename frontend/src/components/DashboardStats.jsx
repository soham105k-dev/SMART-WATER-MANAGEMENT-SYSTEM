import StatCard from "./StatCard";
import { Gauge, Droplets, AlertTriangle, CheckCircle } from "lucide-react";
import "./DashboardStats.css";

const DashboardStats = ({ avgPressure, avgFlow, activeAlerts, zonesNormal }) => {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <StatCard icon={<Gauge />} title="Avg. Pressure" value={avgPressure} unit="bar" color="blue" />
        <StatCard icon={<Droplets />} title="Avg. Flow Rate" value={avgFlow} unit="L/min" color="green" />
        <StatCard icon={<AlertTriangle />} title="Active Alerts" value={activeAlerts} unit="total" color="yellow" />
        <StatCard icon={<CheckCircle />} title="Zones Normal" value={zonesNormal} unit="zones" color="gray" />
      </div>
    </section>
  );
};

export default DashboardStats;
