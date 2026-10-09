const apiUrl = import.meta.env.VITE_API_URL ?? "";

async function readResponse(response) {
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || !Object.hasOwn(result, "data")) {
    throw new Error(result?.message ?? "Không thể tải hình ảnh.");
  }
  return result.data;
}

export function fetchPhotos() {
  return fetch(`${apiUrl}/api/photos`).then(readResponse);
}
