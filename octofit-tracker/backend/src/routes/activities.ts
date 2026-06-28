import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET all activities
router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().sort({ date: -1 });
  res.json(activities);
});

// GET single activity
router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params['id']);
  if (!activity) { res.status(404).json({ message: 'Activity not found' }); return; }
  res.json(activity);
});

// POST log activity
router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body as object);
  await activity.save();
  res.status(201).json(activity);
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  await Activity.findByIdAndDelete(req.params['id']);
  res.json({ message: 'Activity deleted' });
});

export default router;
