import "./AlertsPanel.css";

const AlertsPanel = ({ alerts = [] }) => {
  const hasAlerts = alerts && alerts.length > 0;

  return (
    <div className="alerts-card">
      {!hasAlerts ? (
        <div className="alerts-normal">
          <div className="alerts-icon success">✓</div>
          <h3>All Systems Normal</h3>
          <p>No active alerts at this time</p>
        </div>
      ) : (
        <div className="alerts-active">
          <h2>Active Alerts ({alerts.length})</h2>

          <ul className="alerts-list">
            {alerts.map((alert) => {
              const displayAlert = {
                id: alert.alertId || alert._id,
                ward: alert.zoneName || "Unknown Zone",
                type: alert.type || "Unknown",
                message: alert.message || "Alert triggered",
                level: (alert.severity || "").toLowerCase() || "warning",
                time: alert.submitted_at 
                  ? new Date(alert.submitted_at).toLocaleTimeString()
                  : "Unknown time"
              };

              return (
                <li
                  key={displayAlert.id}
                  className={`alert-item ${displayAlert.level}`}
                >
                  <div className="alert-info">
                    <strong>{displayAlert.ward}</strong> — {displayAlert.type}
                    <p>{displayAlert.message}</p>
                  </div>
                  <span className="alert-time">{displayAlert.time}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
