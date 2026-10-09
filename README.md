# Wedding Invitation

Workspace gồm API Node.js/Express lưu RSVP trên MongoDB, giao diện thiệp cưới React và trang quản trị React.

## Cấu trúc frontend

Trong cả `apps/wedding-invitation/src` và `apps/admin/src`:

- `api/` chỉ gọi HTTP và trả dữ liệu từ backend.
- `models/` chuẩn hóa dữ liệu thành model dùng trong frontend.
- `repositories/` kết hợp API và model để cung cấp dữ liệu cho app.
- `app/` xử lý state, nghiệp vụ và kết quả API.
- `ui/` chỉ nhận props và hiển thị giao diện; không gọi API hay quản lý nghiệp vụ.
- `App.jsx` kết nối app logic với UI.

## Yêu cầu

- Node.js 20 trở lên và npm
- Docker Desktop để chạy MongoDB local, hoặc một MongoDB URI khác

## Chạy local

Từ thư mục gốc của dự án:

```sh
npm install
cp .env.example .env
docker compose up -d mongodb
npm run dev
```

Các ứng dụng chạy tại:

- Thiệp cưới: http://localhost:5173
- Trang admin: http://localhost:5174
- API: http://localhost:4000

Có thể chạy riêng từng phần bằng `npm run dev:api`, `npm run dev:invitation` hoặc `npm run dev:admin`. Kiểm tra API tại `/api/health`; admin đọc RSVP qua `GET /api/rsvps`, form thiệp gửi RSVP qua `POST /api/rsvps`.

### Response API

Tất cả response từ backend dùng chung envelope `DataResponse<T>`:

```json
{
	"data": {},
	"errors": [],
	"message": "Thành công."
}
```

`data` chứa model hoặc danh sách model khi thành công; khi lỗi, `data` là `null`, `errors` là danh sách lỗi có thể kèm `field`, và `message` là thông báo tổng quát. Ví dụ `GET /api/rsvps` trả `data` là mảng RSVP, còn `POST /api/rsvps` trả model RSVP vừa tạo. Lớp `api/` của frontend đọc envelope này; repository chuẩn hóa `data` thành model cho app.

Nếu dùng MongoDB ngoài Docker, cập nhật `MONGODB_URI` trong `.env`. `CLIENT_URLS` là danh sách origin được phép gọi API, phân tách bằng dấu phẩy.

## Deploy bằng Docker

Yêu cầu Docker Engine/Desktop và Docker Compose v2. Từ thư mục gốc:

```sh
docker compose up --build -d
```

Thiệp sẽ có tại `http://localhost:8080`; trang admin tại `http://localhost:8081` (chỉ bind vào loopback vì chưa có xác thực). Nginx phục vụ hai frontend và chuyển tiếp `/api` đến backend; MongoDB lưu dữ liệu trong volume `wedding-mongodb-data`.

Trước khi deploy thật, đặt `INVITATION_PUBLIC_URL` trong `.env` thành URL công khai của thiệp để nút xem thiệp ở admin trỏ đúng nơi. Có thể đổi cổng bằng `INVITATION_PORT`, `ADMIN_PORT` và `MONGODB_PORT`. Dùng `DOCKER_MONGODB_URI` nếu kết nối tới MongoDB bên ngoài; không public cổng MongoDB hoặc trang admin khi chưa cấu hình bảo mật phù hợp.

Xem log bằng `docker compose logs -f`; dừng các container bằng `docker compose down`. Dữ liệu MongoDB được giữ lại khi dừng; muốn xóa cả dữ liệu thì cần xóa volume riêng.

## Build giao diện

```sh
npm run build
```

## Tùy chỉnh

Tên Minh Nghĩa, Đinh Huòng, ngày cưới và hai địa chỉ bản đồ được cấu hình trong `apps/wedding-invitation/src/app/useInvitation.js` và `apps/admin/src/app/useAdminDashboard.js`. Admin hiện chưa có xác thực, vì vậy chỉ dùng trong môi trường phát triển nội bộ.