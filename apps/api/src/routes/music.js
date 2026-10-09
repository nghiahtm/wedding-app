import express, { Router } from 'express';
import mongoose from 'mongoose';
import Music, { MAX_MUSIC_BYTES } from '../models/Music.js';
import { errorResponse, successResponse } from '../utils/dataResponse.js';
import { requireAdmin } from '../utils/requireAdmin.js';

const router = Router();
// Giữ bài đang dùng trong bộ nhớ để các request Range khi phát nhạc không phải đọc lại cả file từ MongoDB.
let cachedTrack = null;

function toMusicResponse(music) {
  return {
    id: music._id,
    title: music.title,
    size: music.size,
    url: `/api/music/${music._id}/file`,
    createdAt: music.createdAt
  };
}

// Xác định định dạng từ chữ ký file thay vì tin Content-Type do client gửi.
function detectAudioType(buffer) {
  if (buffer.length < 12) return null;
  if (buffer.toString('ascii', 0, 3) === 'ID3' || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)) return 'audio/mpeg';
  if (buffer.toString('ascii', 4, 8) === 'ftyp') return 'audio/mp4';
  if (buffer.toString('ascii', 0, 4) === 'OggS') return 'audio/ogg';
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WAVE') return 'audio/wav';
  return null;
}

async function loadTrack(id) {
  if (cachedTrack?.id === id) return cachedTrack;
  const music = await Music.findById(id).select('+data').lean();
  if (!music) return null;
  const bytes = music.data.buffer ?? music.data;
  cachedTrack = { id, contentType: music.contentType, data: Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength) };
  return cachedTrack;
}

router.get('/', async (_request, response, next) => {
  try {
    const music = await Music.findOne().sort({ createdAt: -1 }).lean();
    response.json(successResponse(music ? toMusicResponse(music) : null, music ? 'Nhạc nền hiện tại.' : 'Chưa có nhạc nền.'));
  } catch (error) {
    next(error);
  }
});

router.get('/:id/file', async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) return response.status(404).end();
    const track = await loadTrack(request.params.id);
    if (!track) return response.status(404).end();

    const total = track.data.length;
    response.set({
      'Content-Type': track.contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff'
    });

    // Trình duyệt (đặc biệt Safari) tải nhạc theo từng đoạn bằng header Range.
    const range = /^bytes=(\d*)-(\d*)$/.exec(request.get('Range') ?? '');
    if (!range) return response.send(track.data);
    let start = range[1] === '' ? total - Number(range[2]) : Number(range[1]);
    let end = range[1] === '' || range[2] === '' ? total - 1 : Number(range[2]);
    start = Math.max(0, start);
    end = Math.min(end, total - 1);
    if (Number.isNaN(start) || Number.isNaN(end) || start > end) {
      return response.status(416).set('Content-Range', `bytes */${total}`).end();
    }
    response.status(206).set('Content-Range', `bytes ${start}-${end}/${total}`);
    response.send(track.data.subarray(start, end + 1));
  } catch (error) {
    next(error);
  }
});

router.put('/', requireAdmin, express.raw({ type: () => true, limit: MAX_MUSIC_BYTES }), async (request, response, next) => {
  try {
    const data = Buffer.isBuffer(request.body) ? request.body : Buffer.alloc(0);
    const contentType = detectAudioType(data);
    if (!contentType) {
      return response.status(400).json(errorResponse(
        [{ field: 'file', message: 'Chỉ hỗ trợ nhạc MP3, M4A, OGG hoặc WAV.' }],
        'Định dạng nhạc không hợp lệ.'
      ));
    }
    const title = String(request.query.title ?? '').trim().slice(0, 120) || 'Nhạc nền';
    const music = await Music.create({ title, contentType, size: data.length, data });
    // Chỉ giữ một bài: bài mới thay bài cũ.
    await Music.deleteMany({ _id: { $ne: music._id } });
    cachedTrack = null;
    response.status(201).json(successResponse(toMusicResponse(music), 'Đã cập nhật nhạc nền.'));
  } catch (error) {
    next(error);
  }
});

router.delete('/', requireAdmin, async (_request, response, next) => {
  try {
    await Music.deleteMany({});
    cachedTrack = null;
    response.json(successResponse(null, 'Đã xóa nhạc nền.'));
  } catch (error) {
    next(error);
  }
});

export default router;
