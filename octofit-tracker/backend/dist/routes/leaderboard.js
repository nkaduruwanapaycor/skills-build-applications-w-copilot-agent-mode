"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
// GET leaderboard sorted by score desc
router.get('/', async (_req, res) => {
    const entries = await Leaderboard_1.default.find().sort({ score: -1 });
    res.json(entries);
});
// POST create/update entry
router.post('/', async (req, res) => {
    const body = req.body;
    const entry = await Leaderboard_1.default.findOneAndUpdate({ username: body.username }, { score: body.score, updated_at: new Date() }, { upsert: true, new: true });
    res.status(201).json(entry);
});
exports.default = router;
