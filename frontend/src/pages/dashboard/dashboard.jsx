import AlertsPanel from "../../components/AlertsPanel";
import DashboardStats from "../../components/DashboardStats";
import SimulationControlPanel from "../../components/SimulationControlPanel";
import ZonalData from "../../components/ZonalData";
import "./dashboard.css";


const alerts = [
  {
    id: 1,
    ward: "Akkalkot Road",
    type: "Pressure",
    level: "critical",
    message: "Pressure dropped below 2.0 bar",
    time: "03:18 pm"
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Real time water pressure monitoring for Solapur City</p>
      </div>
      <DashboardStats />
      <ZonalData />
      <AlertsPanel alerts={alerts} />
      <SimulationControlPanel />
    </div>
  );
};

export default Dashboard;
