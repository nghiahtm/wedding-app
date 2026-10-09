import { Router } from 'express';
import Visit from '../models/Visit.js';
import { errorResponse, successResponse, validationErrors } from '../utils/dataResponse.js';
import { requireAdmin } from '../utils/requireAdmin.js';

const router = Router();
// Cùng một khách tải lại trang trong khoảng này chỉ tính một lượt.
const REVISIT_WINDOW_MS = 30 * 60 * 1000;
const VIETNAM_OFFSET_MS = 7 * 60 * 60 * 1000;

function startOfTodayInVietnam() {
  const vietnamNow = new Date(Date.now() + VIETNAM_OFFSET_MS);
  vietnamNow.setUTCHours(0, 0, 0, 0);
  return new Date(vietnamNow.getTime() - VIETNAM_OFFSET_MS);
}

router.post('/', async (request, response, next) => {
  try {
    const visitorId = String(request.body?.visitorId ?? '').trim();
    const recent = await Visit.exists({ visitorId, createdAt: { $gte: new Date(Date.now() - REVISIT_WINDOW_MS) } });
    if (recent) return response.json(successResponse({ counted: false }, 'Đã ghi nhận lượt ghé thăm trước đó.'));
    await Visit.create({ visitorId });
    response.status(201).json(successResponse({ counted: true }, 'Đã ghi nhận lượt ghé thăm.'));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json(errorResponse(validationErrors(error), 'Mã khách không hợp lệ.'));
    }
    next(error);
  }
});

function countUniqueVisitors() {
  return Visit.distinct('visitorId').then((ids) => ids.length);
}

// Công khai cho thiệp hiển thị ở cuối trang: chỉ trả số đếm, không có dữ liệu khách.
router.get('/summary', async (_request, response, next) => {
  try {
    const [totalVisits, uniqueVisitors] = await Promise.all([Visit.countDocuments(), countUniqueVisitors()]);
    response.json(successResponse({ totalVisits, uniqueVisitors }, 'Số người đã xem thiệp.'));
  } catch (error) {
    next(error);
  }
});

router.get('/stats', requireAdmin, async (_request, response, next) => {
  try {
    const [totalVisits, uniqueVisitors, todayVisits, lastVisit] = await Promise.all([
      Visit.countDocuments(),
      countUniqueVisitors(),
      Visit.countDocuments({ createdAt: { $gte: startOfTodayInVietnam() } }),
      Visit.findOne().sort({ createdAt: -1 }).select('createdAt').lean()
    ]);
    response.json(successResponse(
      { totalVisits, uniqueVisitors, todayVisits, lastVisitAt: lastVisit?.createdAt ?? null },
      'Thống kê lượt ghé thăm.'
    ));
  } catch (error) {
    next(error);
  }
});

export default router;
