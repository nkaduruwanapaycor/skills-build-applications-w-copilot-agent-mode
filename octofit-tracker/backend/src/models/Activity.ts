import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  username: string;
  activity_type: string;
  duration: number; // minutes
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  username: { type: String, required: true },
  activity_type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
