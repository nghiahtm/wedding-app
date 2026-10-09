// Các mục của thiệp theo thứ tự hiển thị; header dùng danh sách này để điều hướng.
// requires: mục chỉ hiện khi có dữ liệu tương ứng (xem useInvitation).
const sections = [
  { id: "story", label: "Lời ngỏ" },
  { id: "family", label: "Gia đình", requires: "families" },
  { id: "album", label: "Album", requires: "couplePhotos" },
  { id: "details", label: "Địa điểm" },
  { id: "cards", label: "Thiệp cưới", requires: "invitationCards" },
  { id: "rsvp", label: "Hồi đáp" },
  { id: "gift", label: "Mừng cưới" },
];

export function getSections() {
  return sections.map((section) => ({ ...section }));
}
