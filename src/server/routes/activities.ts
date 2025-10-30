import express from 'express';
import Activity from '../models/Activity';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .populate('pledge', 'title description')
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user activities
router.get('/user/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.params.userId })
      .populate('pledge', 'title description')
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create activity
router.post('/', auth, async (req, res) => {
  try {
    const { pledgeId, type, description, impact, evidence } = req.body;

    const activity = new Activity({
      user: req.user.id,
      pledge: pledgeId,
      type,
      description,
      impact,
      evidence
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;