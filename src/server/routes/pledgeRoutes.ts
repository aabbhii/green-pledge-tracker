import express from 'express';
import Pledge from '../models/Pledge';

const router = express.Router();

// Get all pledges
router.get('/', async (req, res) => {
  try {
    const pledges = await Pledge.find();
    res.json(pledges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user pledges
router.get('/user/:userId', async (req, res) => {
  try {
    const pledges = await Pledge.find({ userId: req.params.userId });
    res.json(pledges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new pledge
router.post('/', async (req, res) => {
  const pledge = new Pledge({
    ...req.body,
    timeline: []
  });

  try {
    const newPledge = await pledge.save();
    res.status(201).json(newPledge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle pledge completion status
router.put('/:id/toggle', async (req, res) => {
  try {
    const pledge = await Pledge.findById(req.params.id);
    if (!pledge) {
      return res.status(404).json({ message: 'Pledge not found' });
    }
    
    pledge.completed = !pledge.completed;
    const updatedPledge = await pledge.save();
    res.json(updatedPledge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add timeline entry
router.post('/:id/timeline', async (req, res) => {
  try {
    const pledge = await Pledge.findById(req.params.id);
    if (!pledge) {
      return res.status(404).json({ message: 'Pledge not found' });
    }
    
    const timelineEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      month: req.body.month,
      progressPercentage: req.body.progressPercentage
    };
    
    pledge.timeline.push(timelineEntry);
    const updatedPledge = await pledge.save();
    res.json(updatedPledge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;