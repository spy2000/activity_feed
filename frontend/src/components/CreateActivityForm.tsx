import { useState } from "react";
import { createActivity } from "../api/activitiesApi";
import type { Activity } from "../api/activitiesApi";

interface Props {
  onOptimisticAdd: (activity: Activity) => void;
  onReplaceOptimistic: (tempId: string, real: Activity) => void;
  onRollback: (tempId: string) => void;
  onClose: () => void;
}

export default function CreateActivityForm({
  onOptimisticAdd,
  onReplaceOptimistic,
  onRollback,
  onClose
}: Props) {
  const [type, setType] = useState("");
  const [entityId, setEntityId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !entityId) return;

    const clientId = `cid-${crypto.randomUUID()}`;
    const tempId = `temp-${clientId}`;

    const optimisticActivity: Activity = {
      _id: tempId,
      clientId,
      tenantId: "tenant-1",
      actorId: "user-1",
      actorName: "You",
      type,
      entityId,
      metadata: {},
      createdAt: new Date().toISOString()
    };

    onOptimisticAdd(optimisticActivity);
    setSubmitting(true);

    try {
      const real = await createActivity({
        type,
        entityId,
        clientId
      });

      onReplaceOptimistic(tempId, real);
      onClose();
      setType("");
      setEntityId("");
    } catch (err) {
      console.error(err);
      onRollback(tempId);
      alert("Failed to create activity");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <input
        placeholder="Type (e.g. ORDER_CREATED)"
        value={type}
        onChange={e => setType(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Entity ID (e.g. order-123)"
        value={entityId}
        onChange={e => setEntityId(e.target.value)}
        style={styles.input}
      />

      <button type="submit" disabled={submitting} style={styles.primaryButton}>
        {submitting ? "Creating..." : "Create Activity"}
      </button>
    </form>
  );
}

const styles = {
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  primaryButton: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer"
  }
};
