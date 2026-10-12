import { Router } from 'express';
import WeddingInfo from '../models/WeddingInfo.js';
import { errorResponse, successResponse, validationErrors } from '../utils/dataResponse.js';
import { requireAdmin } from '../utils/requireAdmin.js';

const router = Router();
const SIDES = ['groom', 'bride'];
const FAMILY_FIELDS = ['father', 'mother'];
const GIFT_FIELDS = ['bank', 'account', 'holder'];

// Chỉ nhận đúng các trường đã khai báo cho từng bên, bỏ qua mọi trường khác.
const pickGroup = (source, fields) => Object.fromEntries(SIDES.map((side) => [
  side,
  Object.fromEntries(fields.map((field) => [field, String(source?.[side]?.[field] ?? '')]))
]));

function toInfoResponse(info) {
  return { families: pickGroup(info?.families, FAMILY_FIELDS), gifts: pickGroup(info?.gifts, GIFT_FIELDS) };
}

router.get('/', async (_request, response, next) => {
  try {
    const info = await WeddingInfo.findOne({ key: 'main' }).lean();
    response.json(successResponse(toInfoResponse(info), 'Thông tin thiệp cưới.'));
  } catch (error) {
    next(error);
  }
});

// Lưu riêng từng phần: body có "families" thì cập nhật tên bố mẹ, có "gifts" thì cập nhật tài khoản mừng cưới.
router.put('/', requireAdmin, async (request, response, next) => {
  try {
    const update = {};
    if (request.body?.families) update.families = pickGroup(request.body.families, FAMILY_FIELDS);
    if (request.body?.gifts) update.gifts = pickGroup(request.body.gifts, GIFT_FIELDS);
    if (Object.keys(update).length === 0) {
      return response.status(400).json(errorResponse([{ field: 'body', message: 'Không có thông tin nào để lưu.' }], 'Dữ liệu gửi lên không hợp lệ.'));
    }
    const info = await WeddingInfo.findOneAndUpdate(
      { key: 'main' },
      { $set: update },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    response.json(successResponse(toInfoResponse(info), 'Đã lưu thông tin thiệp.'));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json(errorResponse(validationErrors(error), 'Thông tin không hợp lệ.'));
    }
    next(error);
  }
});

export default router;
