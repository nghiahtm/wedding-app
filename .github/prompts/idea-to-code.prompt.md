---
mode: agent
description: Chuyển ý tưởng tính năng thành thay đổi code rõ yêu cầu, đúng kiến trúc và syntax của dự án Wedding Invitation.
---

# Từ ý tưởng đến code

Hãy giúp tôi biến phần mô tả bên dưới thành thay đổi code hoàn chỉnh trong dự án Wedding Invitation. Đọc code và quy ước hiện có trước khi sửa; ưu tiên cách làm nhỏ, dễ bảo trì và nhất quán với repository.

## Ý tưởng của tôi

<!-- Mô tả tính năng hoặc vấn đề cần giải quyết bằng ngôn ngữ tự nhiên. -->
[VIẾT Ý TƯỞNG Ở ĐÂY]

## Bối cảnh và hành vi mong muốn

- Người dùng chính:
  App wedding-invitation: khách mời, app admin: quản trị viên

- Vấn đề cần giải quyết:
  Mong muốn khách mời thiệp gửi có thể điền thông tin, lời chúc
- Luồng sử dụng mong muốn:
  Ở App Wedding Invitation, khách mời có thể điền thông tin, lời chúc  và gửi về backend. Ở App Admin, quản trị viên có thể xem danh sách khách mời đã gửi.
  App Admin có thể lọc danh sách RSVP theo trạng thái đã gửi, chưa gửi, đã xác nhận, chưa xác nhận. không cần phải đăng nhập vì chỉ build dưới local
  Upload được ảnh lên trang chính tối đa 10 tấm
- Kết quả mong muốn:
  [ĐIỀU GÌ SẼ XẢY RA SAU MỖI BƯỚC?]
- Trạng thái đặc biệt cần xử lý:
  [LOADING / EMPTY / ERROR / VALIDATION / SUCCESS]

## Phạm vi kỹ thuật

- App liên quan: [API / wedding-invitation / admin]
- Dữ liệu đầu vào và đầu ra:
  [MÔ TẢ PAYLOAD, RESPONSE, MODEL]
- API hoặc hành vi backend cần có:
  Method dùng: Get để lấy dữ liệu về, Post đẩy/xoá dữ liệu lên
- Bảo mật:
  Cố gắng bên FE wedding sẽ không để lộ thông tin nhạy cảm của BE vì là api public, nếu ẩn đươc dữ liệu khi người dùng debug trên trình duyệt
- Tương thích hoặc giới hạn:
  [RÀNG BUỘC, TÍNH NĂNG KHÔNG ĐƯỢC THAY ĐỔI]
- Deploy: chỉ đẩy phần api và app wedding, admin không đẩy lên server vì chạy ở dưới local
## Syntax và quy ước code

Hãy tuân thủ các quy ước sau, trừ khi repository đã có pattern cụ thể phù hợp hơn:

- Dùng JavaScript ES modules; React component dùng JSX. Không chuyển sang TypeScript nếu tôi chưa yêu cầu.
- Dùng tên biến/hàm mô tả rõ ý nghĩa; component React dùng PascalCase, hàm và biến dùng camelCase.
- Giữ đúng trách nhiệm từng lớp ở frontend:
  - `src/api`: chỉ thực hiện HTTP request, đọc envelope response và báo lỗi.
  - `src/models`: chuẩn hóa dữ liệu từ backend thành model frontend.
  - `src/repositories`: gọi API và chuyển dữ liệu qua model; cung cấp hàm dữ liệu cho app.
  - `src/app`: xử lý state, nghiệp vụ, loading/error/success và điều phối repository.
  - `src/ui`: chỉ nhận dữ liệu và callback qua props để hiển thị; không gọi API, repository hoặc tự sở hữu nghiệp vụ.
  - `App.jsx`: kết nối app logic với UI.
- Backend dùng Node.js, Express, Mongoose và ES modules. Route gọi model/service cần thiết, còn response phải thống nhất theo `DataResponse<T>`:

  ```js
  {
    data: valueOrNull,
    errors: [],
    message: 'Thông báo'
  }
  ```

- Response thành công đặt dữ liệu trong `data`. Response lỗi đặt `data: null`, `errors` là danh sách lỗi có thể có `field`, và `message` là thông báo tổng quát.
- Giữ UI responsive, nội dung hiển thị bằng tiếng Việt và theo thiết kế hiện có.
- Giữ public API và cấu trúc hiện có nếu yêu cầu không cần thay đổi chúng. Không sửa file ngoài phạm vi.
- Không thêm dependency nếu tiện ích hiện có hoặc nền tảng đã đáp ứng được yêu cầu.

## Điều kiện nghiệm thu

- [MÔ TẢ KẾT QUẢ CÓ THỂ KIỂM TRA ĐƯỢC]
- [TRƯỜNG HỢP THÀNH CÔNG]
- [TRƯỜNG HỢP LỖI / DỮ LIỆU BIÊN]
- [YÊU CẦU RESPONSIVE / API / DATABASE NẾU CÓ]

## Cách thực hiện

1. Xác định code path và component/module đang sở hữu hành vi liên quan.
2. Nếu thiếu thông tin quan trọng có thể làm thay đổi thiết kế hoặc API, hỏi tối đa 3 câu ngắn. Nếu không, nêu giả định rồi tiếp tục.
3. Đề xuất thay đổi ngắn gọn, sau đó triển khai trong phạm vi yêu cầu.
4. Thêm hoặc cập nhật kiểm thử phù hợp với rủi ro và pattern hiện có.
5. Chạy kiểm tra hẹp trước, sau đó chạy build/test cần thiết nếu môi trường hỗ trợ.
6. Kết thúc bằng tóm tắt file/hành vi đã đổi, lệnh kiểm tra và mọi giới hạn chưa xác minh.
