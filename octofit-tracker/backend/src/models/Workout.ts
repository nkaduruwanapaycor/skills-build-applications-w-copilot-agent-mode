import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: string[];
  duration: number; // minutes
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  exercises: [{ type: String }],
  duration: { type: Number, required: true },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
