const apiUrl = import.meta.env.VITE_API_URL ?? '';

export function createMusicModel(data) {
  if (!data) return null;
  return {
    id: String(data.id ?? data._id ?? ''),
    title: String(data.title ?? 'Nhạc nền'),
    size: Number(data.size ?? 0),
    url: data.url ? `${apiUrl}${data.url}` : '',
    createdAt: data.createdAt ?? null
  };
}
