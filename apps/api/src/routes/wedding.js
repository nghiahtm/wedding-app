import { Router } from 'express';
import WeddingInfo from '../models/WeddingInfo.js';
import { errorResponse, successResponse, validationErrors } from '../utils/dataResponse.js';
import { requireAdmin } from '../utils/requireAdmin.js';

const router = Router();
const SIDES = ['groom', 'bride'];

function toFamiliesResponse(info) {
  const pick = (side) => ({ father: info?.families?.[side]?.father ?? '', mother: info?.families?.[side]?.mother ?? '' });
  return { groom: pick('groom'), bride: pick('bride') };
}

// Chỉ nhận đúng 4 trường tên bố mẹ, bỏ qua mọi trường khác.
function pickFamilies(body = {}) {
  return Object.fromEntries(SIDES.map((side) => [side, {
    father: String(body.families?.[side]?.father ?? ''),
    mother: String(body.families?.[side]?.mother ?? '')
  }]));
}

router.get('/', async (_request, response, next) => {
  try {
    const info = await WeddingInfo.findOne({ key: 'main' }).lean();
    response.json(successResponse({ families: toFamiliesResponse(info) }, 'Thông tin thiệp cưới.'));
  } catch (error) {
    next(error);
  }
});

router.put('/', requireAdmin, async (request, response, next) => {
  try {
    const info = await WeddingInfo.findOneAndUpdate(
      { key: 'main' },
      { key: 'main', families: pickFamilies(request.body) },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    response.json(successResponse({ families: toFamiliesResponse(info) }, 'Đã lưu thông tin gia đình.'));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json(errorResponse(validationErrors(error), 'Thông tin gia đình không hợp lệ.'));
    }
    next(error);
  }
});

export default router;
