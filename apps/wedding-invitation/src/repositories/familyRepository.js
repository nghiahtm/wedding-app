import { fetchWeddingInfo } from "../api/wedding.js";
import { createFamiliesModel } from "../models/Family.js";
import { getWeddingDetails } from "./weddingRepository.js";

// Thông tin hai bên gia đình: tên bố mẹ nhập ở admin + tên cô dâu chú rể, địa chỉ nhà.
export async function getFamilies() {
  const info = await fetchWeddingInfo();
  return createFamiliesModel(info.families, getWeddingDetails());
}
