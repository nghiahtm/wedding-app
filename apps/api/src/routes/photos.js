import express, { Router } from 'express';
import mongoose from 'mongoose';
import Photo, { MAX_COUPLE_PHOTOS, PHOTO_CATEGORIES, PHOTO_SIDES } from '../models/Photo.js';
import { errorResponse, successResponse } from '../utils/dataResponse.js';
import { requireAdmin } from '../utils/requireAdmin.js';

const router = Router();
const SLOT_CATEGORIES = ['invitation', 'qr'];

function toPhotoResponse(photo) {
  return {
    id: photo._id,
    category: photo.category,
    side: photo.side,
    url: `/api/photos/${photo._id}/file`,
    createdAt: photo.createdAt
  };
}

// Xác định định dạng từ chữ ký file thay vì tin Content-Type do client gửi.
function detectImageType(buffer) {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg';
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
  return null;
}

function badRequest(response, field, message) {
  return response.status(400).json(errorResponse([{ field, message }], message));
}

router.get('/', async (_request, response, next) => {
  try {
    const photos = await Photo.find().sort({ createdAt: 1 }).lean();
    response.json(successResponse(photos.map(toPhotoResponse), 'Danh sách hình ảnh.'));
  } catch (error) {
    next(error);
  }
});

router.get('/:id/file', async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) return response.status(404).end();
    const photo = await Photo.findById(request.params.id).select('+data').lean();
    if (!photo) return response.status(404).end();
    response.set({
      'Content-Type': photo.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff'
    });
    response.send(photo.data.buffer ?? photo.data);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAdmin, express.raw({ type: () => true, limit: '6mb' }), async (request, response, next) => {
  try {
    const { category } = request.query;
    const side = request.query.side || null;
    if (!PHOTO_CATEGORIES.includes(category)) return badRequest(response, 'category', 'Loại ảnh không hợp lệ.');
    if (SLOT_CATEGORIES.includes(category) && !PHOTO_SIDES.includes(side)) return badRequest(response, 'side', 'Cần chọn nhà trai hoặc nhà gái.');
    if (category === 'couple' && side) return badRequest(response, 'side', 'Ảnh cô dâu chú rể không cần chọn bên.');

    const data = Buffer.isBuffer(request.body) ? request.body : Buffer.alloc(0);
    const contentType = detectImageType(data);
    if (!contentType) return badRequest(response, 'file', 'Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP.');

    if (category === 'couple' && await Photo.countDocuments({ category }) >= MAX_COUPLE_PHOTOS) {
      return badRequest(response, 'file', `Chỉ được tải tối đa ${MAX_COUPLE_PHOTOS} ảnh cô dâu chú rể.`);
    }

    const photo = await Photo.create({ category, side, contentType, size: data.length, data });
    // Thiệp cưới và QR mỗi bên chỉ giữ một ảnh: ảnh mới thay ảnh cũ.
    if (SLOT_CATEGORIES.includes(category)) {
      await Photo.deleteMany({ category, side, _id: { $ne: photo._id } });
    }
    response.status(201).json(successResponse(toPhotoResponse(photo), 'Tải ảnh lên thành công.'));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireAdmin, async (request, response, next) => {
  try {
    const photo = mongoose.isValidObjectId(request.params.id) ? await Photo.findByIdAndDelete(request.params.id).lean() : null;
    if (!photo) {
      return response.status(404).json(errorResponse([{ field: 'id', message: 'Không tìm thấy ảnh.' }], 'Không tìm thấy ảnh.'));
    }
    response.json(successResponse(toPhotoResponse(photo), 'Đã xóa ảnh.'));
  } catch (error) {
    next(error);
  }
});

export default router;
