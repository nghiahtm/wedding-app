import { createHash, timingSafeEqual } from 'node:crypto';
import { errorResponse } from './dataResponse.js';

// So sánh qua hash để độ dài luôn bằng nhau và thời gian so sánh không lộ khóa.
function matchesKey(received, expected) {
  const digest = (value) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(received), digest(expected));
}

// Ghi dữ liệu nhạy cảm (ảnh, mã QR, nhạc) và xem thống kê chỉ cho phép khi có X-Admin-Key khớp ADMIN_API_KEY.
// Trang admin chạy local và proxy của nó tự gắn header này, nên khóa không nằm trong mã trình duyệt.
export function requireAdmin(request, response, next) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    if (process.env.NODE_ENV !== 'production') return next();
    return response.status(503).json(errorResponse(
      [{ message: 'Máy chủ chưa cấu hình ADMIN_API_KEY.' }],
      'Chức năng quản trị chưa được bật.'
    ));
  }
  if (!matchesKey(request.get('X-Admin-Key') ?? '', adminKey)) {
    return response.status(401).json(errorResponse(
      [{ message: 'Thiếu hoặc sai khóa quản trị.' }],
      'Bạn không có quyền thực hiện thao tác này.'
    ));
  }
  next();
}
