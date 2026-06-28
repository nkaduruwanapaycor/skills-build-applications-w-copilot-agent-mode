import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: string[];
  created_at: Date;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  members: [{ type: String }],
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<ITeam>('Team', TeamSchema);
