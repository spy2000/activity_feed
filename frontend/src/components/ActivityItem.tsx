import React from "react";
import type { Activity } from "../api/activitiesApi";

interface Props {
  activity: Activity;
}

function ActivityItem({ activity }: Props) {
  return (
    <div style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
      <strong>{activity.actorName}</strong> {activity.type}
      <div>
        <small>
          {new Date(activity.createdAt).toLocaleString()}
        </small>
      </div>
    </div>
  );
}

export default React.memo(ActivityItem);
