import { fetchPhotos, postPhoto, removePhoto } from '../api/photos.js';
import { createPhotoModel } from '../models/Photo.js';

// Khớp với giới hạn MAX_COUPLE_PHOTOS của API.
export const MAX_COUPLE_PHOTOS = 10;

export async function listPhotos() {
  const records = await fetchPhotos();
  return records.map(createPhotoModel);
}

export async function uploadPhoto(file, slot) {
  return createPhotoModel(await postPhoto(file, slot));
}

export async function deletePhoto(id) {
  await removePhoto(id);
}
