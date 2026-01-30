import { useState } from "react";
import CreateActivityForm from "./CreateActivityForm";
import type { Activity } from "../api/activitiesApi";

interface Props {
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

export default function CreateActivityModal({ setActivities }: Props) {
  const [open, setOpen] = useState(false);

  const handleOptimisticAdd = (activity: Activity) => {
    setActivities(prev => [activity, ...prev]);
  };

  // ✅ Replace by clientId (not temp _id)
  const handleReplaceOptimistic = (tempId: string, real: Activity) => {
    setActivities(prev =>
      prev.map(a =>
        a.clientId && real.clientId && a.clientId === real.clientId
          ? real
          : a
      )
    );
  };

  const handleRollback = (tempId: string) => {
    setActivities(prev => prev.filter(a => a._id !== tempId));
  };

  return (
    <>
      <button onClick={() => setOpen(true)} style={styles.primaryButton}>
        + Create Activity
      </button>

      {open && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: 12 }}>Create Activity</h2>

            <CreateActivityForm
              onOptimisticAdd={handleOptimisticAdd}
              onReplaceOptimistic={handleReplaceOptimistic}
              onRollback={handleRollback}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  primaryButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    marginBottom: 16
  },
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    width: 420,
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  }
};
