import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';

dotenv.config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) });
const { default: app } = await import('./app.js');

const port = process.env.PORT ?? 4000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/wedding_invitation';

try {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
} catch (error) {
  console.error('Could not connect to MongoDB:', error.message);
  process.exit(1);
}