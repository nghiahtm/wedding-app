const apiUrl = import.meta.env.VITE_API_URL ?? "";

export async function fetchWishes() {
  const response = await fetch(`${apiUrl}/api/rsvps/wishes`);
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || !Object.hasOwn(result, "data")) {
    throw new Error(result?.message ?? "Không tải được lời chúc.");
  }
  return result.data;
}
