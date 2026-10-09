const apiUrl = import.meta.env.VITE_API_URL ?? '';

async function readResponse(response) {
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(result?.message ?? 'Không thể kết nối API. Vui lòng thử lại sau.');
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