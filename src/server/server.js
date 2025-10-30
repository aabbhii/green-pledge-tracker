// CommonJS format
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/GreenPledgeTracker');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Pledge routes
app.get('/api/pledges', (req, res) => {
  res.json([]);  // Return empty array for testing
});

app.post('/api/pledges', (req, res) => {
  res.status(201).json(req.body);
});

app.post('/api/pledges/:id/timeline', (req, res) => {
  const { id } = req.params;
  const entry = req.body;
  
  // For testing, just echo back the data
  res.json({
    id,
    timeline: [entry]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});