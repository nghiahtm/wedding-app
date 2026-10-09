const apiUrl = import.meta.env.VITE_API_URL ?? "";

export function createPhotoModel(data = {}) {
  return {
    id: String(data.id ?? data._id ?? ""),
    category: String(data.category ?? ""),
    side: data.side ?? null,
    url: data.url ? `${apiUrl}${data.url}` : "",
  };
}

export function groupPhotos(photos) {
  const findSlot = (category, side) =>
    photos.find((photo) => photo.category === category && photo.side === side) ?? null;
  return {
    couple: photos.filter((photo) => photo.category === "couple"),
    invitation: { groom: findSlot("invitation", "groom"), bride: findSlot("invitation", "bride") },
    qr: { groom: findSlot("qr", "groom"), bride: findSlot("qr", "bride") },
  };
}

export const emptyPhotos = groupPhotos([]);
