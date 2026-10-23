import { loadImage } from './prepareImage.js';

// Cắt ảnh theo vùng vuông (px của ảnh gốc), giữ nguyên độ phân giải để mã QR vẫn quét rõ.
export async function cropImage(file, { x, y, size }) {
  const image = await loadImage(file);
  const side = Math.max(1, Math.round(size));
  const canvas = document.createElement('canvas');
  canvas.width = side;
  canvas.height = side;
  canvas.getContext('2d').drawImage(image, x, y, size, size, 0, 0, side, side);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Không cắt được ảnh này.');
  return new File([blob], 'qr.png', { type: 'image/png' });
}
