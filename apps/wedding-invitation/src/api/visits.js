const apiUrl = import.meta.env.VITE_API_URL ?? "";

export function postVisit(visitorId) {
  return fetch(`${apiUrl}/api/visits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId }),
    keepalive: true,
  }).then((response) => {
    if (!response.ok) throw new Error("Không ghi nhận được lượt ghé thăm.");
  });
}

export async function fetchVisitSummary() {
  const response = await fetch(`${apiUrl}/api/visits/summary`);
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || !Object.hasOwn(result, "data")) {
    throw new Error(result?.message ?? "Không tải được số người đã xem.");
  }
  return result.data;
}
