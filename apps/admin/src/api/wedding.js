const apiUrl = import.meta.env.VITE_API_URL ?? '';

async function readResponse(response) {
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(result?.message ?? 'Không kết nối được API. Hãy kiểm tra API (cổng 4000) và MongoDB đã chạy chưa, rồi thử lại.');
    error.errors = result?.errors ?? [];
    throw error;
  }
  if (!result || !Object.hasOwn(result, 'data')) throw new Error('Phản hồi từ API không đúng định dạng.');
  return result.data;
}

function request(options) {
  return fetch(`${apiUrl}/api/wedding`, options)
    .catch(() => {
      throw new Error('Không thể kết nối API. Vui lòng kiểm tra backend.');
    })
    .then(readResponse);
}

export function fetchWeddingInfo() {
  return request();
}

export function putWeddingInfo(info) {
  return request({ method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(info) });
}
