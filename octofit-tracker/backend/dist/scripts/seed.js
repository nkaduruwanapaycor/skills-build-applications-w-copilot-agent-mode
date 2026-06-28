"use strict";
/**
 * Seed the octofit_db database with test data
 *
 * Usage: npx tsx src/scripts/seed.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Workout_1 = __importDefault(require("../models/Workout"));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const seed = async () => {
    await mongoose_1.default.connect(MONGO_URI);
    console.log('Connected to MongoDB — seeding octofit_db...');
    // Clear existing data
    await Promise.all([
        User_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    // Users
    const users = await User_1.default.insertMany([
        { username: 'monaoctocat', email: 'mona@octofit.io', password: 'hashed_pw_1' },
        { username: 'codercat', email: 'coder@octofit.io', password: 'hashed_pw_2' },
        { username: 'fitnessfeline', email: 'feline@octofit.io', password: 'hashed_pw_3' },
        { username: 'deploydog', email: 'deploy@octofit.io', password: 'hashed_pw_4' },
        { username: 'pullrequestpanda', email: 'panda@octofit.io', password: 'hashed_pw_5' },
    ]);
    console.log(`Seeded ${users.length} users`);
    // Teams
    const teams = await Team_1.default.insertMany([
        { name: 'Octo Runners', members: ['monaoctocat', 'codercat'] },
        { name: 'Deploy Dashers', members: ['deploydog', 'fitnessfeline'] },
        { name: 'PR Panthers', members: ['pullrequestpanda', 'monaoctocat'] },
    ]);
    console.log(`Seeded ${teams.length} teams`);
    // Activities
    const activities = await Activity_1.default.insertMany([
        { username: 'monaoctocat', activity_type: 'Running', duration: 30, date: new Date() },
        { username: 'codercat', activity_type: 'Cycling', duration: 45, date: new Date() },
        { username: 'fitnessfeline', activity_type: 'Yoga', duration: 60, date: new Date() },
        { username: 'deploydog', activity_type: 'Swimming', duration: 40, date: new Date() },
        { username: 'pullrequestpanda', activity_type: 'Weightlifting', duration: 50, date: new Date() },
    ]);
    console.log(`Seeded ${activities.length} activities`);
    // Leaderboard
    const leaderboard = await Leaderboard_1.default.insertMany([
        { username: 'monaoctocat', score: 980 },
        { username: 'pullrequestpanda', score: 870 },
        { username: 'fitnessfeline', score: 760 },
        { username: 'codercat', score: 650 },
        { username: 'deploydog', score: 540 },
    ]);
    console.log(`Seeded ${leaderboard.length} leaderboard entries`);
    // Workouts
    const workouts = await Workout_1.default.insertMany([
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
    await mongoose_1.default.disconnect();
    console.log('Seeding complete. Disconnected from MongoDB.');
};
seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
