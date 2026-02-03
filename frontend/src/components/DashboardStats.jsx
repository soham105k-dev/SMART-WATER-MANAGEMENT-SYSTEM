import StatCard from "./StatCard";
import { Gauge, Droplets, AlertTriangle, CheckCircle } from "lucide-react";
import "./DashboardStats.css";

<<<<<<< HEAD
const DashboardStats = ({ avgPressure, avgFlow, activeAlerts, zonesNormal }) => {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <StatCard icon={<Gauge />} title="Avg. Pressure" value={avgPressure} unit="bar" color="blue" />
        <StatCard icon={<Droplets />} title="Avg. Flow Rate" value={avgFlow} unit="L/min" color="green" />
        <StatCard icon={<AlertTriangle />} title="Active Alerts" value={activeAlerts} unit="total" color="yellow" />
        <StatCard icon={<CheckCircle />} title="Zones Normal" value={zonesNormal} unit="zones" color="gray" />

=======
const DashboardStats = () => {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <StatCard icon={<Gauge />} title="Avg. Pressure" value="2.65" unit="bar" color="blue" />
        <StatCard icon={<Droplets />} title="Avg. Flow Rate" value="419" unit="L/min" color="green" />
        <StatCard icon={<AlertTriangle />} title="Active Alerts" value="0" unit="total" color="yellow" />
        <StatCard icon={<CheckCircle />} title="Zones Normal" value="8/8" unit="zones" color="gray" />
>>>>>>> 5836bb3d8e02a8e52accbd89e976d3e56cbcebcf
      </div>
    </section>
  );
};

export default DashboardStats;
