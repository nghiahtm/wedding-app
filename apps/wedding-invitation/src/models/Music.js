const apiUrl = import.meta.env.VITE_API_URL ?? "";

export function createMusicModel(data) {
  if (!data?.url) return null;
  return {
    id: String(data.id ?? data._id ?? ""),
    title: String(data.title ?? ""),
    url: `${apiUrl}${data.url}`,
  };
}
