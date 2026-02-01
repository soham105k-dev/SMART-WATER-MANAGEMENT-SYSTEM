import StatCard from "./StatCard";
import { Gauge, Droplets, AlertTriangle, CheckCircle } from "lucide-react";
import "./DashboardStats.css";

const DashboardStats = () => {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <StatCard icon={<Gauge />} title="Avg. Pressure" value="2.65" unit="bar" color="blue" />
        <StatCard icon={<Droplets />} title="Avg. Flow Rate" value="419" unit="L/min" color="green" />
        <StatCard icon={<AlertTriangle />} title="Active Alerts" value="0" unit="total" color="yellow" />
        <StatCard icon={<CheckCircle />} title="Zones Normal" value="8/8" unit="zones" color="gray" />
      </div>
    </section>
  );
};

export default DashboardStats;
