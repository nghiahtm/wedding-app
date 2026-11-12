// Một địa điểm: địa chỉ cùng liên kết mở bản đồ và bản đồ nhúng (ghim theo tọa độ nếu có).
export function createLocationModel(data = {}) {
  const coordinates = String(data.coordinates ?? "").trim();
  const address = String(data.address ?? "");
  const query = encodeURIComponent(coordinates || address);
  return {
    name: String(data.name ?? ""),
    address,
    coordinates,
    mapUrl: String(data.mapUrl ?? "") || `https://www.google.com/maps/search/?api=1&query=${query}`,
    // Chỉ ghim theo tọa độ / địa chỉ, không kèm tên địa điểm nên Google không hiện thẻ đánh giá.
    embedUrl: `https://www.google.com/maps?q=${query}&z=16&output=embed`,
  };
}
