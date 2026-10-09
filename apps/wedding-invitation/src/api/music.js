const apiUrl = import.meta.env.VITE_API_URL ?? "";

async function readResponse(response) {
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || !Object.hasOwn(result, "data")) {
    throw new Error(result?.message ?? "Không thể tải nhạc nền.");
  }
  return result.data;
}

export function fetchMusic() {
  return fetch(`${apiUrl}/api/music`).then(readResponse);
}
