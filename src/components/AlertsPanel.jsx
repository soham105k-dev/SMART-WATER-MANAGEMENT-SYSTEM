import "./AlertsPanel.css";

const AlertsPanel = ({ alerts }) => {
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
          <h2>Active Alerts</h2>

          <ul className="alerts-list">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className={`alert-item ${alert.level}`}
              >
                <div className="alert-info">
                  <strong>{alert.ward}</strong> — {alert.type}
                  <p>{alert.message}</p>
                </div>
                <span className="alert-time">{alert.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
