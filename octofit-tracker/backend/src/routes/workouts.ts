import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

// GET all workouts
router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

// GET single workout
router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params['id']);
  if (!workout) { res.status(404).json({ message: 'Workout not found' }); return; }
  res.json(workout);
});

// POST create workout
router.post('/', async (req: Request, res: Response) => {
  const workout = new Workout(req.body as object);
  await workout.save();
  res.status(201).json(workout);
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  await Workout.findByIdAndDelete(req.params['id']);
  res.json({ message: 'Workout deleted' });
});

export default router;
