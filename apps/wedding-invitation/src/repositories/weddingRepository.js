import { createVenueSideModel } from "../models/Location.js";

const BRIDE_HOME = {
  address: "Thôn Đông Văn Thịnh, xã Khánh Thiện, Ninh Bình",
  coordinates: "20.202606, 106.093301",
};

// Địa điểm theo từng bên. Địa điểm đầu tiên là nhà riêng (dùng cho mục Gia đình).
// Thêm coordinates: 'vĩ độ,kinh độ' (lấy từ Google Maps) để ghim chính xác; để trống thì tìm theo địa chỉ.
// Hai địa điểm cùng địa chỉ trong một bên sẽ gộp thành một bản đồ.
const weddingSides = [
  {
    side: "groom",
    label: "Nhà trai",
    locations: [
      { name: "Nhà trai", address: "48 Trần Duật, Nam Định, Ninh Bình", coordinates: "20.434038, 106.187957" },
      {
        name: "Nhà hàng",
        address: "Sảnh 3 - Tầng 2 - 153 Nguyễn Du - Khách sạn Vị Hoàng, P.Nam Định, Ninh Bình",
        coordinates: "20.432631447716364, 106.18093343795594",
      },
    ],
  },
  {
    side: "bride",
    label: "Nhà gái",
    locations: [
      { name: "Nhà gái", ...BRIDE_HOME },
      { name: "Nhà hàng", ...BRIDE_HOME },
    ],
  },
];

const weddingDetails = {
  groomName: "Minh Nghĩa",
  brideName: "Đinh Hường",
  // Họ tên đầy đủ in trên tấm thiệp mời ở trang đầu.
  groomFullName: "Minh Nghĩa",
  brideFullName: "Đinh Hường",
  // Chữ cái viết tắt dùng cho chữ lồng ở header, chân trang và cửa sổ ảnh.
  initials: { groom: "N", bride: "H" },
  invitation: {
    eyebrow: "Trân trọng kính mời",
    intro: "Bạn cùng gia đình đến dự lễ thành hôn của chúng tôi",
    closing: "Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi.",
  },
  dateShort: "29 · 11 · 2026",
  dateLong: "Chủ Nhật, ngày 29 tháng 11 năm 2026",
  date: { year: 2026, month: 11, day: 29 },
};

export function getWeddingDetails() {
  return { ...weddingDetails, sides: weddingSides.map(createVenueSideModel) };
}
