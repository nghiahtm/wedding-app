import { fetchWeddingInfo } from "../api/wedding.js";
import { createGiftsModel } from "../models/Gift.js";

// Tài khoản nhận mừng cưới hai bên: ngân hàng, số tài khoản, chủ tài khoản (API /api/wedding, nhập ở admin).
export async function getGifts() {
  const info = await fetchWeddingInfo();
  return createGiftsModel(info.gifts);
}
