// Một địa điểm: địa chỉ cùng liên kết mở bản đồ và bản đồ nhúng (ghim theo tọa độ nếu có).
export function createLocationModel(data = {}) {
  const coordinates = String(data.coordinates ?? "").trim();
  const address = String(data.address ?? "");
  const query = encodeURIComponent(coordinates || address);
  const name = String(data.name ?? "").trim();
  // Bản đồ nhúng có tên địa điểm thì Google hiện thẻ thông tin (tên, địa chỉ, đánh giá, nút mở và chỉ đường).
  const embedQuery =
    name && coordinates
      ? `q=${encodeURIComponent(`${name}, ${address}`)}&ll=${encodeURIComponent(coordinates.replace(/[ ]+/g, ""))}`
      : `q=${query}`;
  return {
    name: String(data.name ?? ""),
    address,
    coordinates,
    mapUrl: String(data.mapUrl ?? "") || `https://www.google.com/maps/search/?api=1&query=${query}`,
    embedUrl: `https://www.google.com/maps?${embedQuery}&z=16&output=embed`,
  };
}
