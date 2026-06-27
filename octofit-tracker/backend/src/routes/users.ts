import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// GET all users
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find({}, '-password');
  res.json(users);
});

// GET single user
router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params['id'], '-password');
  if (!user) { res.status(404).json({ message: 'User not found' }); return; }
  res.json(user);
});

// POST create user
router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body as object);
  await user.save();
  res.status(201).json(user);
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params['id']);
  res.json({ message: 'User deleted' });
});

export default router;
