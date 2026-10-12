// Các tab của trang quản trị theo thứ tự hiển thị trên thanh bên và thanh tab điện thoại.
const tabs = [
  { id: 'overview', label: 'Tổng quan', description: 'Theo dõi hồi đáp và lượt xem thiệp cưới.' },
  { id: 'info', label: 'Thông tin', description: 'Tên bố mẹ hai bên và tài khoản mừng cưới hiển thị trên thiệp.' },
  { id: 'guests', label: 'Khách mời', description: 'Danh sách hồi đáp, số khách và lời nhắn.' },
  { id: 'photos', label: 'Hình ảnh', description: 'Ảnh cưới, thiệp hai họ và mã QR mừng cưới.' },
  { id: 'music', label: 'Nhạc nền', description: 'Bài nhạc phát khi khách mở thiệp.' }
];

export function getTabs() {
  return tabs.map((tab) => ({ ...tab }));
}
