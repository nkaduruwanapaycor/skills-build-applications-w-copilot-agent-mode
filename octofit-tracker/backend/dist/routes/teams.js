"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
// GET all teams
router.get('/', async (_req, res) => {
    const teams = await Team_1.default.find();
    res.json(teams);
});
// GET single team
router.get('/:id', async (req, res) => {
    const team = await Team_1.default.findById(req.params['id']);
    if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
    }
    res.json(team);
});
// POST create team
router.post('/', async (req, res) => {
    const team = new Team_1.default(req.body);
    await team.save();
    res.status(201).json(team);
});
// DELETE team
router.delete('/:id', async (req, res) => {
    await Team_1.default.findByIdAndDelete(req.params['id']);
    res.json({ message: 'Team deleted' });
});
exports.default = router;
