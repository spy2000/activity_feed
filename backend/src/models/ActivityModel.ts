import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  tenantId: string;
  actorId: string;
  actorName: string;
  type: string;
  entityId: string;
  metadata?: Record<string, any>;
  clientId: String,
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>({
  tenantId: { type: String, required: true },
  actorId: String,
  actorName: String,
  type: String,
  entityId: String,
  metadata: Object,
  clientId: String,
  createdAt: { type: Date, default: Date.now }
});

ActivitySchema.index({ tenantId: 1, createdAt: -1 });

export default mongoose.model<IActivity>("Activity", ActivitySchema);
