const apiUrl = import.meta.env.VITE_API_URL ?? '';

export function createPhotoModel(data = {}) {
  return {
    id: String(data.id ?? data._id ?? ''),
    category: String(data.category ?? ''),
    side: data.side ?? null,
    url: data.url ? `${apiUrl}${data.url}` : '',
    createdAt: data.createdAt ?? null
  };
}
