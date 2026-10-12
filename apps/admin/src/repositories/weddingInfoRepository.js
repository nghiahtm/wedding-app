import { fetchWeddingInfo, putWeddingInfo } from '../api/wedding.js';
import { createFamiliesModel } from '../models/Families.js';
import { createGiftsModel } from '../models/Gifts.js';

// Khớp với giới hạn MAX_PARENT_NAME và MAX_GIFT_FIELD của API.
export const MAX_PARENT_NAME = 80;
export const MAX_GIFT_FIELD = 80;

export async function getFamilies() {
  const info = await fetchWeddingInfo();
  return createFamiliesModel(info.families);
}

export async function saveFamilies(families) {
  const info = await putWeddingInfo({ families });
  return createFamiliesModel(info.families);
}

export async function getGifts() {
  const info = await fetchWeddingInfo();
  return createGiftsModel(info.gifts);
}

export async function saveGifts(gifts) {
  const info = await putWeddingInfo({ gifts });
  return createGiftsModel(info.gifts);
}
