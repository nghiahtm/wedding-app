---
mode: agent
description: Lập kế hoạch, sửa và kiểm tra riêng trang admin local để quản lý RSVP của Wedding Invitation.
---

# Wedding Admin

Làm việc chủ yếu trong `apps/admin`. Trang admin hiện dành cho chạy local, không nằm trong phạm vi deploy production. Không thêm đăng nhập hoặc thay đổi bảo mật ngoài yêu cầu nếu chưa trao đổi; nếu đổi môi trường triển khai, phải đánh giá lại xác thực trước.

## Ý tưởng / yêu cầu lần này

Bây giờ đổi lại giúp tôi tên là Minh Nghĩa và Đinh Huòng, ngày cưới là 29/10/2026, địa điểm trên trang sẽ link tới bản đồ để lấy thông tin chính xác cho nhà trai và nhà gái. nhớ bên app wedding đổi theo luôn

## Hành vi cần giữ

- Quản trị viên xem danh sách RSVP, lời chúc và số liệu tổng hợp.
- Hỗ trợ loading, empty, error và trạng thái lọc rõ ràng.
- Khi cần lọc, phân biệt hai khái niệm: khách đã gửi/chưa gửi RSVP và khách xác nhận tham dự/từ chối tham dự. Kiểm tra model/API hiện có; không suy diễn trạng thái “đã gửi lời mời” nếu dữ liệu chưa lưu trạng thái đó. Nếu thiếu field/API, nêu rõ và phối hợp thay đổi backend.
- UI tiếng Việt, responsive desktop/tablet/mobile; bảng dữ liệu có thể cuộn ngang trên màn hình hẹp thay vì làm vỡ layout.

## Ranh giới kiến trúc bắt buộc

- `src/api`: chỉ gọi HTTP và đọc envelope response.
- `src/models`: chuẩn hóa response thành model frontend.
- `src/repositories`: phối hợp API và model để lấy dữ liệu.
- `src/app`: fetch lifecycle, state, filter, thống kê và xử lý lỗi.
- `src/ui`: chỉ nhận props/callback để hiển thị; không gọi API/repository và không chứa nghiệp vụ.
- `App.jsx`: nối app logic với UI.
- Mọi API response theo `DataResponse<T>` `{ data, errors, message }`; repository trả model đã chuẩn hóa cho app.

## Phạm vi và nghiệm thu

- Thay đổi mong muốn: [MÔ TẢ]
- Trạng thái/điều kiện lọc cần kiểm tra: [MÔ TẢ]
- Không sửa `wedding-invitation` hoặc API trừ khi contract hiện tại không thể đáp ứng; nếu cần sửa API, nêu contract mới và tác động trước khi triển khai.

Giữ thay đổi nhỏ, không thêm dependency nếu không cần. Cập nhật kiểm thử phù hợp, chạy build/test khả dụng và kết thúc bằng tóm tắt các file đã đổi cùng giới hạn kiểm thử.
