import { Router } from 'express';
import mongoose from 'mongoose';
import Rsvp from '../models/Rsvp.js';
import { errorResponse, successResponse, validationErrors } from '../utils/dataResponse.js';
import { requireAdmin } from '../utils/requireAdmin.js';

const router = Router();
const PUBLIC_WISH_LIMIT = 20;
// Khách chỉ được gửi các trường này, không ghi đè được trường hệ thống.
const GUEST_FIELDS = ['name', 'phone', 'attendance', 'guests', 'note'];

function pickGuestFields(body = {}) {
  return Object.fromEntries(GUEST_FIELDS.filter((field) => field in body).map((field) => [field, body[field]]));
}

// Danh sách đầy đủ có số điện thoại: chỉ admin.
router.get('/', requireAdmin, async (_request, response, next) => {
  try {
    const rsvps = await Rsvp.find().sort({ createdAt: -1 }).lean();
    response.json(successResponse(rsvps, 'Danh sách hồi đáp.'));
  } catch (error) {
    next(error);
  }
});

// Công khai cho thiệp: lời chúc mới nhất, chỉ gồm tên, nội dung và thời gian.
router.get('/wishes', async (_request, response, next) => {
  try {
    const wishes = await Rsvp.find({ note: { $ne: '' } })
      .sort({ createdAt: -1 })
      .limit(PUBLIC_WISH_LIMIT)
      .select('name note createdAt')
      .lean();
    const data = wishes.map(({ _id, name, note, createdAt }) => ({ id: _id, name, message: note, createdAt }));
    response.json(successResponse(data, 'Lời chúc gần đây.'));
  } catch (error) {
    next(error);
  }
});

// Xóa riêng lời chúc (lời nhắn) của một khách; thông tin hồi đáp tham dự vẫn giữ nguyên.
router.delete('/:id/note', requireAdmin, async (request, response, next) => {
  try {
    const rsvp = mongoose.isValidObjectId(request.params.id)
      ? await Rsvp.findByIdAndUpdate(request.params.id, { $set: { note: '' } }, { new: true }).lean()
      : null;
    if (!rsvp) {
      return response.status(404).json(errorResponse([{ field: 'id', message: 'Không tìm thấy hồi đáp.' }], 'Không tìm thấy hồi đáp.'));
    }
    response.json(successResponse(rsvp, 'Đã xóa lời chúc.'));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const rsvp = await Rsvp.create(pickGuestFields(request.body));
    response.status(201).json(successResponse(rsvp, 'Gửi hồi đáp thành công.'));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json(errorResponse(validationErrors(error), 'Dữ liệu hồi đáp không hợp lệ.'));
    }
    next(error);
  }
});

export default router;
