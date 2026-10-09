import { fetchPhotos } from "../api/photos.js";
import { createPhotoModel, groupPhotos } from "../models/Photo.js";

export async function listPhotos() {
  const records = await fetchPhotos();
  return groupPhotos(records.map(createPhotoModel));
}
