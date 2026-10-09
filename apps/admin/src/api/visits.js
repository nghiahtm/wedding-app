const apiUrl = import.meta.env.VITE_API_URL ?? '';

export async function fetchVisitStats() {
  const response = await fetch(`${apiUrl}/api/visits/stats`).catch(() => {
    throw new Error('Không thể kết nối API. Vui lòng kiểm tra backend.');
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || !Object.hasOwn(result, 'data')) {
    throw new Error(result?.message ?? 'Không tải được thống kê lượt ghé thăm.');
  }
  return result.data;
}
