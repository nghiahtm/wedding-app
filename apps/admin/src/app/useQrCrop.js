import { useEffect, useState } from 'react';
import { cropImage } from './cropImage.js';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 6 * 1024 * 1024;

// Ảnh QR chọn xong sẽ mở hộp cắt; cắt xong mới tải lên. `upload(side, file)` do nơi dùng cung cấp.
export function useQrCrop({ upload, onError }) {
  const [pending, setPending] = useState(null);

  useEffect(() => () => pending && URL.revokeObjectURL(pending.url), [pending]);

  function request(side, file) {
    if (!ACCEPTED_TYPES.includes(file.type)) return onError('Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP.');
    if (file.size > MAX_BYTES) return onError('Ảnh QR quá lớn, tối đa 6MB.');
    setPending({ side, file, url: URL.createObjectURL(file) });
  }

  async function confirm(region) {
    const { side, file } = pending;
    setPending(null);
    try {
      await upload(side, await cropImage(file, region));
    } catch (error) {
      onError(error.message);
    }
  }

  return { pending, request, confirm, cancel: () => setPending(null) };
}
