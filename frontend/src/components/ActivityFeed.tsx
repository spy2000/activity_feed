import { useEffect, useState, useCallback, useRef } from "react";
import { fetchActivities } from "../api/activitiesApi";
import type { Activity } from "../api/activitiesApi";
import ActivityItem from "./ActivityItem";
import CreateActivityModal from "./CreateActivityModal";
import { socket } from "../socket";

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const res = await fetchActivities(cursor);

      if (res.data.length > 0) {
        setActivities(prev => {
          const existingIds = new Set(prev.map(a => a._id));
          const existingClientIds = new Set(
            prev.map(a => a.clientId).filter(Boolean)
          );

          const newItems = res.data.filter(item =>
            !existingIds.has(item._id) &&
            !(item.clientId && existingClientIds.has(item.clientId))
          );

          return [...prev, ...newItems];
        });

        setCursor(res.nextCursor);
        setHasMore(Boolean(res.nextCursor));
      }
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [cursor, hasMore]);

  useEffect(() => {
    loadMore();
  }, []);

  // ✅ Socket reconciliation (clientId + _id)
  useEffect(() => {
    socket.on("new-activity", (activity: Activity) => {
      setActivities(prev => {
        const exists = prev.some(a =>
          a._id === activity._id ||
          (a.clientId && activity.clientId && a.clientId === activity.clientId)
        );

        if (exists) return prev;

        return [activity, ...prev];
      });
    });

    return () => {
      socket.off("new-activity");
    };
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Activity Feed</h1>

      <CreateActivityModal setActivities={setActivities} />

      {!activities.length && !loading && (
        <div style={{ textAlign: "center", color: "#888" }}>
          No activities yet
        </div>
      )}

      {activities.map(a => (
        <ActivityItem key={a._id} activity={a} />
      ))}

      {hasMore && !loading && (
        <button onClick={loadMore} style={{ marginTop: 12 }}>
          Load More
        </button>
      )}

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
    </div>
  );
}
