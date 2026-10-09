const apiUrl = import.meta.env.VITE_API_URL ?? '';

async function readResponse(response) {
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    // Không có JSON nghĩa là proxy không tới được API (API hoặc MongoDB chưa chạy).
    const error = new Error(result?.message ?? 'Không kết nối được API. Hãy kiểm tra API (cổng 4000) và MongoDB đã chạy chưa, rồi thử lại.');
    error.errors = result?.errors ?? [];
    throw error;
  }
  if (!result || !Object.hasOwn(result, 'data')) {
    throw new Error('Phản hồi từ API không đúng định dạng.');
  }
  return result.data;
}

function request(path, options) {
  return fetch(`${apiUrl}${path}`, options)
    .catch(() => {
      throw new Error('Không thể kết nối API. Vui lòng kiểm tra backend.');
    })
    .then(readResponse);
}

export function fetchPhotos() {
  return request('/api/photos');
}

export function postPhoto(file, { category, side }) {
  const query = new URLSearchParams({ category, ...(side ? { side } : {}) });
  return request(`/api/photos?${query}`, { method: 'POST', headers: { 'Content-Type': file.type }, body: file });
}

export function removePhoto(id) {
  return request(`/api/photos/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
