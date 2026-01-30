import type { Activity } from "../api/activitiesApi";

interface Props {
  activity: Activity;
}

export default function ActivityItem({ activity }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <strong>{activity.actorName}</strong>
        <span style={styles.type}>{activity.type}</span>
      </div>

      <div style={styles.entity}>
        Entity: {activity.entityId}
      </div>

      <div style={styles.time}>
        {new Date(activity.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6
  },
  type: {
    background: "#e0e7ff",
    color: "#3730a3",
    padding: "2px 8px",
    borderRadius: 6,
    fontSize: 12
  },
  entity: {
    color: "#555",
    marginBottom: 6
  },
  time: {
    fontSize: 12,
    color: "#888"
  }
};
