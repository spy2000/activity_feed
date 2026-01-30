import { useState, useCallback } from "react";
import { fetchActivities} from "../api/activitiesApi";
import type {  Activity } from "../api/activitiesApi";

export function useActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const res = await fetchActivities(cursor);

    setActivities(prev => [...prev, ...res.data]);
    setCursor(res.nextCursor);
    setHasMore(!!res.nextCursor);
    setLoading(false);
  }, [cursor, loading, hasMore]);

  return { activities, setActivities, loadMore, loading };
}
