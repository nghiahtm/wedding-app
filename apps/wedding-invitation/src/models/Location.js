export function createLocationModel(data = {}) {
  const coordinates = String(data.coordinates ?? "").trim();
  const address = String(data.address ?? "");
  const query = encodeURIComponent(coordinates || address);
  return {
    name: String(data.name ?? ""),
    address,
    coordinates,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
    embedUrl: `https://www.google.com/maps?q=${query}&z=16&output=embed`,
  };
}

// Gộp các địa điểm cùng địa chỉ thành một (một bản đồ), tên nối bằng " · ".
function mergeSameAddress(locations) {
  const merged = [];
  for (const location of locations) {
    const key = location.coordinates || location.address;
    const existing = merged.find((item) => (item.coordinates || item.address) === key);
    if (existing) existing.names.push(location.name);
    else merged.push({ ...location, names: [location.name] });
  }
  return merged.map((item) => ({ ...item, name: item.names.join(" · ") }));
}

// Một bên (nhà trai / nhà gái): địa điểm đầu tiên là nhà riêng.
export function createVenueSideModel(data = {}) {
  const locations = (data.locations ?? []).map(createLocationModel);
  return {
    side: data.side,
    label: String(data.label ?? ""),
    homeAddress: locations[0]?.address ?? "",
    anchorId: `details-${data.side}`,
    locations: mergeSameAddress(locations),
  };
}
