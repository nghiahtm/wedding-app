import cors from 'cors';
import express from 'express';
import rsvpRoutes from './routes/rsvps.js';
import { errorResponse, successResponse } from './utils/dataResponse.js';

const app = express();
const allowedOrigins = (process.env.CLIENT_URLS ?? 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => {
  response.json(successResponse({ status: 'ok' }, 'API đang hoạt động.'));
});

app.use('/api/rsvps', rsvpRoutes);

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
  response.status(500).json(errorResponse(
    [{ message: 'Đã xảy ra lỗi ngoài ý muốn.' }],
    'Đã xảy ra lỗi máy chủ.'
  ));
});

export default app;