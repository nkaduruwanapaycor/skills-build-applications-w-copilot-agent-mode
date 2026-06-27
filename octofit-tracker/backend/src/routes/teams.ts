import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

// GET all teams
router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find();
  res.json(teams);
});

// GET single team
router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params['id']);
  if (!team) { res.status(404).json({ message: 'Team not found' }); return; }
  res.json(team);
});

// POST create team
router.post('/', async (req: Request, res: Response) => {
  const team = new Team(req.body as object);
  await team.save();
  res.status(201).json(team);
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  await Team.findByIdAndDelete(req.params['id']);
  res.json({ message: 'Team deleted' });
});

export default router;
