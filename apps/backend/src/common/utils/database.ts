import { logger } from '@src/server';
import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    logger.info('MongoDB Connected... to ' + conn.connection.name);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

export { connectDB };
