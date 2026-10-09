const SIDES = [
  { side: "groom", label: "Nhà trai", childLabel: "Chú rể", nameKey: "groomFullName" },
  { side: "bride", label: "Nhà gái", childLabel: "Cô dâu", nameKey: "brideFullName" },
];

// Ghép tên bố mẹ (từ API) với tên cô dâu chú rể và địa chỉ nhà (dữ liệu cục bộ).
// mapAnchorId: id cột bản đồ của bên đó ở mục Địa điểm.
export function createFamiliesModel(families = {}, weddingDetails) {
  return SIDES.map(({ side, label, childLabel, nameKey }) => {
    const venue = weddingDetails.sides.find((item) => item.side === side);
    return {
      side,
      label,
      father: String(families[side]?.father ?? "").trim(),
      mother: String(families[side]?.mother ?? "").trim(),
      childLabel,
      childName: weddingDetails[nameKey],
      address: venue?.homeAddress ?? "",
      mapAnchorId: venue?.anchorId ?? "details",
    };
  });
}

export function hasParentNames(families) {
  return families.some((family) => family.father || family.mother);
}
