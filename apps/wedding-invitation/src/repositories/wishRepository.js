import { fetchWishes } from "../api/wishes.js";
import { createWishModel } from "../models/Wish.js";

// Tối đa 20 lời chúc mới nhất, mới nhất đứng đầu.
export async function listWishes() {
  const records = await fetchWishes();
  return records.map(createWishModel).filter((wish) => wish.message);
}
