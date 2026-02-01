import DashboardStats from "../../components/DashboardStats";
import ZonalData from "../../components/ZonalData";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Real time water pressure monitoring for Solapur City</p>
      </div>

      <DashboardStats />
      <ZonalData />
    </div>
  );
};

export default Dashboard;
 