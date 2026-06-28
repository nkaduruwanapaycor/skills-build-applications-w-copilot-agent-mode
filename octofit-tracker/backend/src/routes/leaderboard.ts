import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// GET leaderboard sorted by score desc
router.get('/', async (_req: Request, res: Response) => {
  const entries = await Leaderboard.find().sort({ score: -1 });
  res.json(entries);
});

// POST create/update entry
router.post('/', async (req: Request, res: Response) => {
  const body = req.body as { username: string; score: number };
  const entry = await Leaderboard.findOneAndUpdate(
    { username: body.username },
    { score: body.score, updated_at: new Date() },
    { upsert: true, new: true },
  );
  res.status(201).json(entry);
});

export default router;
