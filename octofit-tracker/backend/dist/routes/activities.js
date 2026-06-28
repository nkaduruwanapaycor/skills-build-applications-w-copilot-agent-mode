"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
// GET all activities
router.get('/', async (_req, res) => {
    const activities = await Activity_1.default.find().sort({ date: -1 });
    res.json(activities);
});
// GET single activity
router.get('/:id', async (req, res) => {
    const activity = await Activity_1.default.findById(req.params['id']);
    if (!activity) {
        res.status(404).json({ message: 'Activity not found' });
        return;
    }
    res.json(activity);
});
// POST log activity
router.post('/', async (req, res) => {
    const activity = new Activity_1.default(req.body);
    await activity.save();
    res.status(201).json(activity);
});
// DELETE activity
router.delete('/:id', async (req, res) => {
    await Activity_1.default.findByIdAndDelete(req.params['id']);
    res.json({ message: 'Activity deleted' });
});
exports.default = router;
