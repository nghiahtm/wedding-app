import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) });
const { default: app } = await import('./app.js');
const { connectDatabase, getMongoUri } = await import('./db.js');

const port = process.env.PORT ?? 4000;

let mongoUri;
try {
  mongoUri = getMongoUri();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

if (process.env.NODE_ENV === 'production' && !process.env.ADMIN_API_KEY) {
  console.warn('Chưa đặt ADMIN_API_KEY: trang admin sẽ không tải/xóa được ảnh.');
}

const disconnectDatabase = connectDatabase(mongoUri);
const server = app.listen(port, () => console.log(`API listening on http://localhost:${port}`));

async function shutdown(signal) {
  console.log(`Nhận ${signal}, đang dừng API...`);
  server.close();
  await disconnectDatabase();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
