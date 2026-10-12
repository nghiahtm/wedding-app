import { createLocationModel } from "../models/Location.js";

// Nơi tổ chức tiệc cưới (mục Địa điểm): bản đồ ghim theo tọa độ "vĩ độ, kinh độ" lấy từ Google Maps; để trống thì tìm theo địa chỉ.
const venue = {
  name: "Khách sạn Vị Hoàng",
  address: "Sảnh 3 - Tầng 2 - 153 Nguyễn Du - Khách sạn Vị Hoàng, P.Nam Định, Ninh Bình",
  coordinates: "20.4326666, 106.1808996",
  // Liên kết trang địa điểm trên Google Maps (nút Mở bản đồ); bỏ trống thì tìm theo tọa độ.
  mapUrl:
    "https://www.google.com/maps/place/Kh%C3%A1ch+s%E1%BA%A1n+V%E1%BB%8B+Ho%C3%A0ng/@20.4326666,106.1783193,16z/data=!3m1!4b1!4m9!3m8!1s0x3135e747e0cfaaaf:0xeae66e51bf10a9ca!5m2!4m1!1i2!8m2!3d20.4326666!4d106.1808996!16s%2Fg%2F1td1yqy8?entry=ttu",
};

// Địa chỉ nhà riêng hai bên (hiện ở mục Thông tin lễ cưới).
const homes = {
  groom: "48 Trần Nhật Duật, phường Nam Định, Ninh Bình",
  bride: "Thôn Đông Văn Thịnh, xã Khánh Thiện, Ninh Bình",
};

// Tọa độ nhà riêng hai bên ("vĩ độ, kinh độ" từ Google Maps) để nút Chỉ đường ghim đúng nhà.
const homeCoordinates = {
  groom: "20.4340914, 106.1880998",
  bride: "20.202606, 106.093301",
};

const weddingDetails = {
  groomName: "Hoàng Nghĩa",
  brideName: "Đinh Hường",
  // Họ tên đầy đủ in trên tấm thiệp mời ở trang đầu.
  groomFullName: "Hoàng Nghĩa",
  brideFullName: "Đinh Hường",
  // Chữ cái viết tắt dùng cho chữ lồng ở header, chân trang và cửa sổ ảnh.
  initials: { groom: "N", bride: "H" },
  invitation: {
    eyebrow: "Trân trọng kính mời",
    intro: "Đến dự buổi tiệc chung vui cùng gia đình",
    closing: "Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi.",
  },
  // Thông tin tiệc cưới (mục Thông tin). time: giờ khai tiệc, ví dụ "11:00"; để trống thì ẩn các dòng giờ.
  event: {
    time: "11:00",
    // Nơi và giờ làm lễ thành hôn (mục Thông tin lễ cưới); để trống thì ẩn dòng đó.
    ceremony: { place: "Sảnh 3 - Tầng 2, Khách sạn Vị Hoàng", time: "11:00" },
    weekday: "Chủ nhật",
    day: "29",
    month: "Tháng 11",
    year: "2026",
    lunar: "Tức ngày 21/10 năm Bính Ngọ âm lịch",
    // Bữa cơm thân mật mỗi bên (mục Thông tin lễ cưới); đổi giờ, ngày, nơi ở đây. Bỏ một bên khỏi danh sách thì ẩn bên đó.
    dinners: {
      groom: { title: "Bữa cơm thân mật - Nhà trai", time: "17 : 00", weekday: "Thứ bảy", date: "28/11/2026", place: "Tại tư gia nhà trai" },
      bride: { title: "Bữa cơm thân mật - Nhà gái", time: "16 : 00", weekday: "Thứ bảy", date: "28/11/2026", place: "Tại tư gia nhà gái" },
    },
  },
  dateShort: "29 · 11 · 2026",
  dateLong: "Chủ Nhật, ngày 29 tháng 11 năm 2026",
  date: { year: 2026, month: 11, day: 29 },
};

const pad = (value) => String(value).padStart(2, "0");

// Liên kết Google Calendar: sự kiện cả ngày, địa điểm là nơi tổ chức tiệc của nhà trai.
// Thời lượng mặc định của sự kiện trên lịch khi có giờ khai tiệc.
const EVENT_HOURS = 3;

// Liên kết Google Calendar: có giờ khai tiệc thì tạo sự kiện theo giờ Việt Nam, không thì cả ngày.
function buildCalendarUrl({ groomName, brideName, date, event }) {
  const day = `${date.year}${pad(date.month)}${pad(date.day)}`;
  const nextDay = new Date(Date.UTC(date.year, date.month - 1, date.day + 1));
  const [hour, minute] = event.time ? event.time.split(":").map(Number) : [];
  const dates = event.time
    ? `${day}T${pad(hour)}${pad(minute)}00/${day}T${pad(hour + EVENT_HOURS)}${pad(minute)}00`
    : `${day}/${nextDay.getUTCFullYear()}${pad(nextDay.getUTCMonth() + 1)}${pad(nextDay.getUTCDate())}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Tiệc cưới ${groomName} & ${brideName}`,
    dates,
    ctz: "Asia/Ho_Chi_Minh",
    location: `${venue.name}, ${venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function getWeddingDetails() {
  return {
    ...weddingDetails,
    calendarUrl: buildCalendarUrl(weddingDetails),
    venue: createLocationModel(venue),
    homes,
    homeCoordinates,
  };
}
