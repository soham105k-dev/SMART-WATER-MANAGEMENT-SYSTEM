import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

import Dashboard from "./pages/dashboard/dashboard";
import Alerts from "./pages/alerts/alerts";
import Analytics from "./pages/analytics/analytics";
import Settings from "./pages/settings/settings";
import ZoneMonitoring from "./pages/zoneMonitoring/zoneMonitoring";


function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* default route → / */}
        <Route index element={<Dashboard />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="zone-monitoring" element={<ZoneMonitoring />} />

      </Route>
    </Routes>
  );
}

export default App;
