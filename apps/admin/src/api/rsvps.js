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

export function fetchRsvps() {
  return fetch(`${apiUrl}/api/rsvps`)
    .catch(() => {
      throw new Error('Không thể kết nối API. Vui lòng kiểm tra backend.');
    })
    .then(readResponse);
}

export function removeRsvpNote(id) {
  return fetch(`${apiUrl}/api/rsvps/${encodeURIComponent(id)}/note`, { method: 'DELETE' })
    .catch(() => {
      throw new Error('Không thể kết nối API. Vui lòng kiểm tra backend.');
    })
    .then(readResponse);
}
