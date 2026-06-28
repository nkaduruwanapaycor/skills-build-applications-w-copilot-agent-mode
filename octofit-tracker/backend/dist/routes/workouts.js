"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
// GET all workouts
router.get('/', async (_req, res) => {
    const workouts = await Workout_1.default.find();
    res.json(workouts);
});
// GET single workout
router.get('/:id', async (req, res) => {
    const workout = await Workout_1.default.findById(req.params['id']);
    if (!workout) {
        res.status(404).json({ message: 'Workout not found' });
        return;
    }
    res.json(workout);
});
// POST create workout
router.post('/', async (req, res) => {
    const workout = new Workout_1.default(req.body);
    await workout.save();
    res.status(201).json(workout);
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    await Workout_1.default.findByIdAndDelete(req.params['id']);
    res.json({ message: 'Workout deleted' });
});
exports.default = router;
