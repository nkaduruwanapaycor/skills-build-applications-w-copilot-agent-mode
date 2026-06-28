/**
 * Seed the octofit_db database with test data
 *
 * Usage: npx tsx src/scripts/seed.ts
 */

import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const seed = async (): Promise<void> => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB — seeding octofit_db...');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  // Users
  const users = await User.insertMany([
    { username: 'monaoctocat', email: 'mona@octofit.io', password: 'hashed_pw_1' },
    { username: 'codercat', email: 'coder@octofit.io', password: 'hashed_pw_2' },
    { username: 'fitnessfeline', email: 'feline@octofit.io', password: 'hashed_pw_3' },
    { username: 'deploydog', email: 'deploy@octofit.io', password: 'hashed_pw_4' },
    { username: 'pullrequestpanda', email: 'panda@octofit.io', password: 'hashed_pw_5' },
  ]);
  console.log(`Seeded ${users.length} users`);

  // Teams
  const teams = await Team.insertMany([
    { name: 'Octo Runners', members: ['monaoctocat', 'codercat'] },
    { name: 'Deploy Dashers', members: ['deploydog', 'fitnessfeline'] },
    { name: 'PR Panthers', members: ['pullrequestpanda', 'monaoctocat'] },
  ]);
  console.log(`Seeded ${teams.length} teams`);

  // Activities
  const activities = await Activity.insertMany([
    { username: 'monaoctocat', activity_type: 'Running', duration: 30, date: new Date() },
    { username: 'codercat', activity_type: 'Cycling', duration: 45, date: new Date() },
    { username: 'fitnessfeline', activity_type: 'Yoga', duration: 60, date: new Date() },
    { username: 'deploydog', activity_type: 'Swimming', duration: 40, date: new Date() },
    { username: 'pullrequestpanda', activity_type: 'Weightlifting', duration: 50, date: new Date() },
  ]);
  console.log(`Seeded ${activities.length} activities`);

  // Leaderboard
  const leaderboard = await Leaderboard.insertMany([
    { username: 'monaoctocat', score: 980 },
    { username: 'pullrequestpanda', score: 870 },
    { username: 'fitnessfeline', score: 760 },
    { username: 'codercat', score: 650 },
    { username: 'deploydog', score: 540 },
  ]);
  console.log(`Seeded ${leaderboard.length} leaderboard entries`);

  // Workouts
  const workouts = await Workout.insertMany([
    {
      name: 'Morning Boost',
      description: 'A quick energizing morning routine',
      exercises: ['Jumping Jacks', 'Push-ups', 'Sit-ups'],
      duration: 20,
    },
    {
      name: 'Cardio Blast',
      description: 'High intensity cardio session',
      exercises: ['Running', 'Burpees', 'High Knees'],
      duration: 40,
    },
    {
      name: 'Strength Builder',
      description: 'Full body strength training',
      exercises: ['Squats', 'Deadlifts', 'Bench Press', 'Pull-ups'],
      duration: 60,
    },
  ]);
  console.log(`Seeded ${workouts.length} workouts`);

  await mongoose.disconnect();
  console.log('Seeding complete. Disconnected from MongoDB.');
};

seed().catch((err: unknown) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
