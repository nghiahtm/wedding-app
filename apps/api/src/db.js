import mongoose from 'mongoose';

const RETRY_DELAY_MS = 5000;

// Ẩn tài khoản/mật khẩu khi ghi log chuỗi kết nối.
export function maskMongoUri(uri) {
  return uri.replace(/\/\/[^@/]+@/, '//***:***@');
}

export function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

export function getMongoUri() {
  const uri = process.env.MONGODB_URI?.trim();
  if (uri) return uri;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Thiếu MONGODB_URI. Khi chạy production phải khai báo chuỗi kết nối MongoDB trong .env.');
  }
  return 'mongodb://127.0.0.1:27017/wedding_invitation';
}

// Kết nối MongoDB và tự thử lại nếu thất bại, để API không thoát khi MongoDB khởi động chậm hoặc tạm mất kết nối.
export function connectDatabase(uri) {
  const target = maskMongoUri(uri);
  let stopped = false;
  let retryTimer = null;

  mongoose.connection.on('connected', () => console.log(`Đã kết nối MongoDB: ${target}`));
  mongoose.connection.on('disconnected', () => {
    if (!stopped) console.warn('Mất kết nối MongoDB, đang chờ kết nối lại...');
  });

  async function attempt() {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    } catch (error) {
      if (stopped) return;
      console.error(`Không kết nối được MongoDB (${target}): ${error.message}`);
      console.error(`Thử lại sau ${RETRY_DELAY_MS / 1000} giây. Kiểm tra MongoDB đã chạy và MONGODB_URI trong .env đúng chưa.`);
      retryTimer = setTimeout(attempt, RETRY_DELAY_MS);
    }
  }

  attempt();

  return async function disconnectDatabase() {
    stopped = true;
    clearTimeout(retryTimer);
    await mongoose.disconnect();
  };
}
