const apiUrl = import.meta.env.VITE_API_URL ?? "";

export async function fetchWeddingInfo() {
  const response = await fetch(`${apiUrl}/api/wedding`);
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || !Object.hasOwn(result, "data")) {
    throw new Error(result?.message ?? "Không tải được thông tin thiệp.");
  }
  return result.data;
}
