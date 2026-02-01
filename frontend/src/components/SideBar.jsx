import "./SideBar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { LuLayoutDashboard } from "react-icons/lu";
import { CiMap } from "react-icons/ci";
import { FiAlertTriangle } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">
        <div
          className="sidebar-collapse"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaChevronLeft />
        </div>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" className="sidebar-link">
            <LuLayoutDashboard />
            <span className="sidebar-text">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/zone-monitoring" className="sidebar-link">
            <CiMap />
            <span className="sidebar-text">Zone Monitoring</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/alerts" className="sidebar-link">
            <FiAlertTriangle />
            <span className="sidebar-text">Alerts</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/analytics" className="sidebar-link">
            <VscGraph />
            <span className="sidebar-text">Analytics</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" className="sidebar-link">
            <IoSettingsOutline />
            <span className="sidebar-text">Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
