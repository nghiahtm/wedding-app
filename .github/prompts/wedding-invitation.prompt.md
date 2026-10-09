---
mode: agent
description: Lập kế hoạch, sửa và kiểm tra riêng giao diện wedding-invitation theo yêu cầu khách mời và quy ước frontend.
---

# Wedding Invitation

Làm việc chủ yếu trong `apps/wedding-invitation`. Chỉ thay đổi `apps/api` khi tính năng cần hợp đồng backend mới; không sửa admin hoặc cấu hình deploy ngoài phạm vi cần thiết. Trước khi sửa, đọc code hiện tại và xác định luồng dữ liệu liên quan.

## Ý tưởng / yêu cầu lần này

[ĐIỀN TÍNH NĂNG HOẶC VẤN ĐỀ CẦN LÀM]

## Kết quả mong muốn

- Khách mời có thể điền thông tin và lời chúc, sau đó gửi RSVP.
- Giao diện hiển thị rõ loading, success, validation và error.
- Giao diện tiếng Việt, responsive trên desktop, tablet và mobile.
- Khu vực ảnh trang chính hỗ trợ tối đa 10 ảnh. Trước khi triển khai upload, kiểm tra cơ chế lưu trữ hiện có; không giả vờ đã upload thành công nếu chưa có backend/storage phù hợp.

## Ranh giới kiến trúc bắt buộc

- `src/api`: chỉ gọi HTTP và đọc envelope response.
- `src/models`: chuẩn hóa response thành model frontend.
- `src/repositories`: phối hợp API và model, cung cấp thao tác dữ liệu cho app.
- `src/app`: state, nghiệp vụ, validation, trạng thái loading/error/success và xử lý kết quả API.
- `src/ui`: chỉ hiển thị props và gọi callback; không gọi API/repository, không tự quản lý nghiệp vụ.
- `App.jsx`: nối app logic với UI.
- Mọi API response theo `DataResponse<T>`: `{ data, errors, message }`. Không đọc payload thô trực tiếp trong UI.

## Bảo mật và deploy

- Không đưa MongoDB URI, API key, secret hoặc cấu hình riêng tư vào bundle frontend.
- API public không thể che endpoint hay dữ liệu được gửi tới trình duyệt khỏi DevTools. Chỉ gửi dữ liệu cần thiết và bảo vệ thao tác nhạy cảm ở backend.
- Phạm vi deploy của sản phẩm này là API và `wedding-invitation`; admin chạy local theo yêu cầu dự án.

## Điều kiện nghiệm thu

- [HÀNH VI CỤ THỂ CẦN ĐẠT]
- [TRẠNG THÁI VÀ TRƯỜNG HỢP BIÊN]
- [YÊU CẦU ẢNH / RESPONSIVE / API NẾU CÓ]

Giữ thay đổi nhỏ, không tự thêm tính năng ngoài yêu cầu. Kiểm tra component lân cận, cập nhật kiểm thử phù hợp và chạy build/test khả dụng. Cuối cùng nêu file đã đổi và giới hạn kiểm thử nếu có.
