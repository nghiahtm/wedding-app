import cors from 'cors';
import express from 'express';
import { isDatabaseReady } from './db.js';
import musicRoutes from './routes/music.js';
import photoRoutes from './routes/photos.js';
import rsvpRoutes from './routes/rsvps.js';
import visitRoutes from './routes/visits.js';
import weddingRoutes from './routes/wedding.js';
import { errorResponse, successResponse } from './utils/dataResponse.js';

const app = express();
const allowedOrigins = (process.env.CLIENT_URLS ?? 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => {
  if (!isDatabaseReady()) {
    return response.status(503).json(errorResponse(
      [{ field: 'database', message: 'Chưa kết nối được MongoDB.' }],
      'API đang chạy nhưng chưa kết nối cơ sở dữ liệu.'
    ));
  }
  response.json(successResponse({ status: 'ok', database: 'connected' }, 'API đang hoạt động.'));
});

// Trả lỗi rõ ràng ngay thay vì để request treo chờ MongoDB.
function requireDatabase(_request, response, next) {
  if (isDatabaseReady()) return next();
  response.status(503).json(errorResponse(
    [{ field: 'database', message: 'Chưa kết nối được MongoDB.' }],
    'Máy chủ chưa kết nối cơ sở dữ liệu. Vui lòng thử lại sau.'
  ));
}

app.use('/api/rsvps', requireDatabase, rsvpRoutes);
app.use('/api/photos', requireDatabase, photoRoutes);
app.use('/api/music', requireDatabase, musicRoutes);
app.use('/api/visits', requireDatabase, visitRoutes);
app.use('/api/wedding', requireDatabase, weddingRoutes);

app.use((_request, response) => {
  response.status(404).json(errorResponse(
    [{ field: 'route', message: 'Không tìm thấy API được yêu cầu.' }],
    'Không tìm thấy API.'
  ));
});

app.use((error, _request, response, _next) => {
  console.error(error);
  if (error.type === 'entity.parse.failed') {
    return response.status(400).json(errorResponse(
      [{ field: 'body', message: 'Nội dung JSON không hợp lệ.' }],
      'Không thể đọc dữ liệu yêu cầu.'
    ));
  }
  if (error.type === 'entity.too.large') {
    return response.status(413).json(errorResponse(
      [{ field: 'file', message: 'File quá lớn (ảnh tối đa 6MB, nhạc tối đa 15MB).' }],
      'Dữ liệu gửi lên quá lớn.'
    ));
  }
  response.status(500).json(errorResponse(
    [{ message: 'Đã xảy ra lỗi ngoài ý muốn.' }],
    'Đã xảy ra lỗi máy chủ.'
  ));
});

export default app;