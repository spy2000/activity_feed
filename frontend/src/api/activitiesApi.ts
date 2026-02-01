export type ActivityMetadata = Record<string, unknown>;
import { baseUrl } from "../config";
// const baseUrl = "http://localhost:5000/api"


export interface Activity {
  _id: string;
  clientId?: string;   // ✅ used to reconcile optimistic + socket
  tenantId: string;
  actorId: string;
  actorName: string;
  type: string;
  entityId: string;
  metadata: ActivityMetadata;
  createdAt: string;
}

export interface CreateActivityPayload {
  type: string;
  entityId: string;
  metadata?: ActivityMetadata;
  clientId?: string;
}

export interface PaginatedActivitiesResponse {
  data: Activity[];
  nextCursor: string | null;
}

export async function fetchActivities(
  cursor?: string | null
): Promise<PaginatedActivitiesResponse> {
  const params = new URLSearchParams();

  if (cursor) {
    params.set("cursor", cursor);
  }

  const res = await fetch(
    `${baseUrl}/api/activities?${params.toString()}`
  );

  if (!res.ok) throw new Error("Fetch failed");

  return res.json();
}

export async function createActivity(payload: CreateActivityPayload) {
  const res = await fetch(`${baseUrl}/api/activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Create failed");
  return res.json();
}
