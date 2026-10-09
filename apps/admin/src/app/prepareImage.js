const MAX_DIMENSION = 2000;
const MAX_UNTOUCHED_BYTES = 1.5 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Không đọc được ảnh này.')); };
    image.src = url;
  });
}

// Thu nhỏ ảnh chụp từ điện thoại trước khi tải lên. Ảnh QR giữ nguyên để không làm mờ mã.
export async function prepareImage(file, { keepOriginal = false } = {}) {
  if (!ACCEPTED_TYPES.includes(file.type)) throw new Error('Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP.');
  if (keepOriginal) {
    if (file.size > 6 * 1024 * 1024) throw new Error('Ảnh QR quá lớn, tối đa 6MB.');
    return file;
  }

  const image = await loadImage(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight));
  if (scale === 1 && file.size <= MAX_UNTOUCHED_BYTES) return file;

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.naturalWidth * scale);
  canvas.height = Math.round(image.naturalHeight * scale);
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.86));
  if (!blob) throw new Error('Không xử lý được ảnh này.');
  return blob;
}
