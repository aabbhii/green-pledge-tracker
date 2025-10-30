import mongoose from 'mongoose';

const timelineEntrySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  month: {
    type: Number,
    enum: [1, 3, 6],
    required: true
  },
  progressPercentage: {
    type: Number,
    default: 0
  }
});

const pledgeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  impactMetric: {
    type: Number,
    required: true
  },
  impactUnit: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  timeline: [timelineEntrySchema]
});

const Pledge = mongoose.model('Pledge', pledgeSchema);

export default Pledge;