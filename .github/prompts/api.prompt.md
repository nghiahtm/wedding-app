---
mode: agent
description: Thiết kế, triển khai và kiểm tra riêng API Node.js/Express/MongoDB cho dự án Wedding Invitation.
---

# Wedding API

Làm việc chủ yếu trong `apps/api`. Trước khi sửa, kiểm tra route, model, middleware, cấu hình môi trường và các frontend consumer liên quan. Chỉ sửa frontend khi cần cập nhật contract và nêu rõ lý do.

## Ý tưởng / yêu cầu lần này

[ĐIỀN ENDPOINT, QUY TẮC NGHIỆP VỤ HOẶC VẤN ĐỀ CẦN LÀM]

## Quy ước kỹ thuật

- Dùng Node.js, Express, Mongoose, JavaScript ES modules; giữ style hiện có.
- Route chỉ điều phối request/response; validate dữ liệu đầu vào và dùng model/service phù hợp.
- Mọi response thành công và lỗi đều phải dùng envelope `DataResponse<T>`:

  ```json
  {
    "data": {
      "id": "rsvp-id",
      "name": "Tên khách mời"
    },
    "errors": [],
    "message": "Thông báo"
  }
  ```

- Thành công: `data` là model hoặc danh sách model, `errors` là mảng rỗng, `message` mô tả kết quả.
- Thất bại: `data` là `null`, `errors` là danh sách `{ field?, message }`, `message` là thông báo tổng quát. Dùng HTTP status phù hợp.
- Giữ envelope nhất quán cho health check, 404, lỗi validation, lỗi parse request và lỗi server.
- Nếu thay đổi schema hoặc response, cập nhật model/repository của frontend bị ảnh hưởng và giữ compatibility có chủ đích.

## Bảo mật và dữ liệu

- Đọc secret từ environment; không ghi secret vào source, response, log hoặc frontend.
- API public không thể giấu endpoint hay response khỏi người dùng đang truy cập trình duyệt. Không tuyên bố dữ liệu public được che khỏi DevTools; giới hạn dữ liệu trả về và bảo vệ thao tác ở server.
- Validate, trim và giới hạn kích thước dữ liệu người dùng gửi lên. Không trả stack trace hoặc thông tin nội bộ khi lỗi production.
- Frontend public chỉ nhận trường cần thiết; không trả MongoDB nội bộ hoặc dữ liệu riêng tư không phục vụ tính năng.

## Tác động và nghiệm thu

- Consumer bị ảnh hưởng: [wedding-invitation / admin / khác]
- Response/model mong muốn: [MÔ TẢ DATA VÀ ERRORS]
- Trường hợp thành công, validation và lỗi: [MÔ TẢ]

Chỉ sửa phạm vi cần thiết, thêm kiểm thử phù hợp, chạy kiểm tra khả dụng và báo rõ nếu chưa thể chạy test/build.
