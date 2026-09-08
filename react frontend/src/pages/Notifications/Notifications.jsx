
import "./Notifications.css";
import { useEffect, useState } from "react";
import { Bell, RefreshCw, AlertTriangle, ClipboardCheck, Users, Send, CheckCircle } from "lucide-react";

const getNotificationIcon = (type) => {
  switch (type) {
    case "Risk Alert":
      return <AlertTriangle size={20} />;
    case "Inspection":
      return <ClipboardCheck size={20} />;
    case "Beneficiary":
      return <Users size={20} />;
    case "PMU":
      return <Send size={20} />;
    default:
      return <Bell size={20} />;
  }
};

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5050/api/notifications");

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setError("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
   <div className="notifications-page">
      <div className="notifications-header">
  <div>
    <h1>Government Notifications</h1>
    <p>Stay updated with important system alerts and activities.</p>
  </div>

  <button className="notifications-refresh" onClick={loadNotifications}>
    <RefreshCw size={16} />
    Refresh
  </button>
</div>

      <div style={{ marginTop: "24px" }}>
  {notifications.map((notification) => (
    <div
      key={notification.id}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        padding: "18px",
        marginBottom: "12px",
        borderRadius: "12px",
        background: notification.read ? "#ffffff" : "#f8fafc",
        border: notification.read
          ? "1px solid #e5e7eb"
          : "1px solid #cbd5e1",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#eef2ff",
        }}
      >
        {getNotificationIcon(notification.type)}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px" }}>
            {notification.title}
          </h3>

          {!notification.read && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: "600",
                padding: "4px 8px",
                borderRadius: "20px",
                background: "#e0e7ff",
              }}
            >
              UNREAD
            </span>
          )}
        </div>

        <p
          style={{
            margin: "8px 0",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          {notification.message}
        </p>

        <small style={{ color: "#64748b" }}>
          {notification.type} · {notification.priority}
        </small>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default Notifications;