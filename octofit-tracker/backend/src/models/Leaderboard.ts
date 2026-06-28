import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  username: string;
  score: number;
  updated_at: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  username: { type: String, required: true, unique: true },
  score: { type: Number, required: true, default: 0 },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
