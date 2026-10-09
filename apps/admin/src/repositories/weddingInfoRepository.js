import { fetchWeddingInfo, putWeddingInfo } from '../api/wedding.js';
import { createFamiliesModel } from '../models/Families.js';

// Khớp với giới hạn MAX_PARENT_NAME của API.
export const MAX_PARENT_NAME = 80;

export async function getFamilies() {
  const info = await fetchWeddingInfo();
  return createFamiliesModel(info.families);
}

export async function saveFamilies(families) {
  const info = await putWeddingInfo({ families });
  return createFamiliesModel(info.families);
}
