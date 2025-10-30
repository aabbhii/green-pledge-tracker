import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/GreenPledgeTracker';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);

    console.log('MongoDB connected successfully');
    console.log(`Database name: ${conn.connection.name}`);
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Port: ${conn.connection.port}`);

    // Listen for connection errors
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};