import { useState, useEffect } from "react";
import { getZoneAnalytics } from "../services/dashboard.service";
import "./ZoneDetailModal.css";
import { IoClose } from "react-icons/io5";

const ZoneDetailModal = ({ zoneId, zoneName, onClose }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZoneDetails = async () => {
      try {
        setLoading(true);
        const res = await getZoneAnalytics(zoneId);
        console.log("Zone Analytics Response:", res);
        
        const analyticsData = res?.data || {};
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Failed to fetch zone analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (zoneId) {
      fetchZoneDetails();
    }
  }, [zoneId]);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Loading...</h2>
            <button className="close-btn" onClick={onClose}>
              <IoClose />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const zoneInfo = analytics?.zone || {};
  const recentReadings = analytics?.recentReadings || [];
  const alerts = analytics?.alerts || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{zoneName} - Detailed Analytics</h2>
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="modal-body">
          {/* Zone Status Section */}
          <section className="modal-section">
            <h3>Current Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <label>Supply Status</label>
                <span className={`status-badge ${zoneInfo.supply_status?.toLowerCase()}`}>
                  {zoneInfo.supply_status || "N/A"}
                </span>
              </div>
              <div className="status-item">
                <label>Zone Status</label>
                <span className={`status-badge ${zoneInfo.status?.toLowerCase()}`}>
                  {zoneInfo.status || "NORMAL"}
                </span>
              </div>
            </div>
          </section>

          {/* Alert History Section */}
          <section className="modal-section">
            <h3>Alert History ({alerts.length})</h3>
            {alerts.length > 0 ? (
              <div className="alerts-history">
                {alerts.map((alert, index) => (
                  <div key={alert._id || index} className="alert-item">
                    <div className="alert-header">
                      <span className={`alert-type ${alert.type?.toLowerCase()}`}>
                        {alert.type}
                      </span>
                      <span className={`alert-severity ${alert.severity?.toLowerCase()}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="alert-message">{alert.message}</p>
                    <span className="alert-time">
                      {new Date(alert.submitted_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No alerts for this zone</p>
            )}
          </section>

          {/* Recent Readings Section */}
          <section className="modal-section">
            <h3>Recent Readings ({recentReadings.length})</h3>
            {recentReadings.length > 0 ? (
              <div className="readings-table">
                <table>
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Pressure (bar)</th>
                      <th>Flow (L/min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReadings.map((reading, index) => (
                      <tr key={reading._id || index}>
                        <td>{new Date(reading.created_at).toLocaleString()}</td>
                        <td className="metric-value">{reading.pressure?.toFixed(2)}</td>
                        <td className="metric-value">{reading.flow?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-data">No readings available yet</p>
            )}
          </section>
        </div>

        <div className="modal-footer">
          <button className="close-modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneDetailModal;
