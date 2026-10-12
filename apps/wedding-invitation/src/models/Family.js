import { createLocationModel } from "./Location.js";

const SIDES = [
  { side: "groom", label: "Nhà trai", childLabel: "Chú rể", nameKey: "groomFullName" },
  { side: "bride", label: "Nhà gái", childLabel: "Cô dâu", nameKey: "brideFullName" },
];

// Ghép tên bố mẹ (từ API) với tên cô dâu chú rể và địa chỉ nhà (dữ liệu cục bộ).
// mapUrl: liên kết Google Maps tới nhà riêng của bên đó (địa chỉ và nút Chỉ đường cùng dùng liên kết này).
export function createFamiliesModel(families = {}, weddingDetails) {
  return SIDES.map(({ side, label, childLabel, nameKey }) => {
    return {
      side,
      label,
      father: String(families[side]?.father ?? "").trim(),
      mother: String(families[side]?.mother ?? "").trim(),
      childLabel,
      childName: weddingDetails[nameKey],
      address: weddingDetails.homes[side] ?? "",
      // Liên kết Google Maps tới nhà riêng của bên đó (địa điểm đầu tiên) và bữa cơm thân mật của bên đó.
      mapUrl: weddingDetails.homes[side]
        ? createLocationModel({ address: weddingDetails.homes[side], coordinates: weddingDetails.homeCoordinates?.[side] }).mapUrl
        : "",
      dinner: weddingDetails.event.dinners?.[side] ?? null,
    };
  });
}
