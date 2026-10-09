# Wedding Invitation

Workspace gồm API Node.js/Express lưu RSVP trên MongoDB, giao diện thiệp cưới React và trang quản trị React.

## Cấu trúc frontend

Trong cả `apps/wedding-invitation/src` và `apps/admin/src`:

- `api/` chỉ gọi HTTP và trả dữ liệu từ backend.
- `models/` chuẩn hóa dữ liệu thành model dùng trong frontend.
- `repositories/` là nơi duy nhất cung cấp dữ liệu cho app: kết hợp API với model, và chứa cả dữ liệu cục bộ (tên cô dâu chú rể, ngày cưới, địa điểm, giới hạn ảnh...).
- `app/` xử lý state, nghiệp vụ và kết quả API.
- `ui/` chỉ nhận props và hiển thị giao diện; không gọi API hay quản lý nghiệp vụ.
- `App.jsx` kết nối app logic với UI.

Quy tắc tách file (tối đa 200 dòng mỗi file), cấu trúc từng mục của thiệp và cách thêm mục mới: xem [CLAUDE.md](CLAUDE.md).

Mới học web? Đọc [docs/huong-dan-cau-truc.md](docs/huong-dan-cau-truc.md): giải thích cách gọi API, `useState`, `useEffect` theo đúng code của dự án.

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

### Hình ảnh thiệp

Trang admin (mục "Hình ảnh") quản lý ảnh hiển thị trên thiệp, lưu trong MongoDB qua `/api/photos`:

- Ảnh cô dâu & chú rể: tối đa 10 ảnh; ảnh đầu tiên làm ảnh bìa, toàn bộ hiện ở mục album.
- Thiệp cưới: một ảnh cho nhà trai, một ảnh cho nhà gái; ảnh mới thay ảnh cũ.
- QR mừng cưới: một mã cho chú rể, một mã cho cô dâu; hiện khi khách mở hộp quà.

Mục "Nhạc nền" chọn một bài nhạc (MP3, M4A, OGG hoặc WAV, tối đa 15MB) qua `/api/music`; bài mới thay bài cũ. Thiệp phát nhạc khi khách bấm con dấu mở thiệp và có nút bật/tắt nhạc ở góc màn hình. File nhạc được phục vụ có hỗ trợ `Range` để Safari/iPhone phát được.

`GET /api/photos`, `GET /api/music` và các đường dẫn file công khai; `PUT`/`POST`/`DELETE` cần header `X-Admin-Key` khớp `ADMIN_API_KEY`. Proxy của trang admin (Vite khi dev, Nginx khi deploy) tự gắn header này nên khóa không nằm trong mã trình duyệt. Khi dev mà chưa đặt `ADMIN_API_KEY`, API cho phép ghi; khi chạy production mà thiếu khóa, API từ chối mọi thao tác ghi ảnh.

Có thể chạy riêng từng phần bằng `npm run dev:api`, `npm run dev:invitation` hoặc `npm run dev:admin`. Kiểm tra API tại `/api/health`: trả `200` khi đã kết nối MongoDB, `503` khi API đang chạy nhưng chưa kết nối được (API tự thử kết nối lại mỗi 5 giây, không cần khởi động lại); admin đọc RSVP qua `GET /api/rsvps` (cần khóa admin vì có số điện thoại), form thiệp gửi RSVP qua `POST /api/rsvps` (lời nhắn tối đa 300 ký tự). Thiệp hiển thị 20 lời chúc mới nhất qua `GET /api/rsvps/wishes` (công khai, chỉ gồm tên, nội dung, thời gian). Tên bố mẹ hai bên lưu qua `PUT /api/wedding` (admin, tab "Thông tin") và hiển thị ở mục "Gia đình hai bên" qua `GET /api/wedding`.

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

Bản production chỉ gồm 3 container: `mongodb`, `api` và `wedding-invitation`. Trang admin **không** được đóng gói hay deploy; chỉ chạy local.

Thiệp có tại `http://localhost:8080`. Nginx phục vụ thiệp và chuyển tiếp `/api` đến backend (giới hạn tải lên 16MB cho file nhạc); MongoDB lưu dữ liệu trong volume `wedding-mongodb-data`.

Trước khi deploy thật, trong `.env` trên máy chủ:

- `ADMIN_API_KEY`: chuỗi ngẫu nhiên dài (ví dụ `openssl rand -hex 32`). Thiếu khóa thì không ai tải/xóa được ảnh, nhạc.
- `MONGO_ROOT_USERNAME`, `MONGO_ROOT_PASSWORD` và `DOCKER_MONGODB_URI` nếu muốn bật mật khẩu MongoDB (xem bên dưới).
- Đặt thiệp sau HTTPS (Cloudflare, Caddy hoặc Nginx có chứng chỉ), vì khóa quản trị được gửi qua tên miền của thiệp.

### Quản lý production từ admin chạy local

Trên máy của bạn, trong `.env`:

```
ADMIN_API_TARGET=https://thiep.example.com
ADMIN_API_KEY=<cùng khóa với máy chủ>
INVITATION_PUBLIC_URL=https://thiep.example.com
```

Rồi chạy `npm run dev:admin` và mở http://localhost:5174. Proxy của Vite chuyển `/api` tới máy chủ và tự gắn header `X-Admin-Key`, nên khóa không nằm trong mã trình duyệt. Khi phát triển local, để `ADMIN_API_TARGET=http://localhost:4000`.

### MongoDB và cổng

Để bật mật khẩu cho MongoDB trong Docker, đặt `MONGO_ROOT_USERNAME`, `MONGO_ROOT_PASSWORD` trước lần chạy đầu tiên (khi volume còn trống) và đưa tài khoản đó vào `DOCKER_MONGODB_URI` kèm `?authSource=admin`. Dùng `DOCKER_MONGODB_URI` nếu kết nối tới MongoDB bên ngoài (ví dụ Atlas). Có thể đổi cổng bằng `INVITATION_PORT` và `MONGODB_PORT`; MongoDB chỉ bind vào loopback, không public cổng này.

Xem log bằng `docker compose logs -f`; dừng các container bằng `docker compose down`. Dữ liệu MongoDB được giữ lại khi dừng; muốn xóa cả dữ liệu thì cần xóa volume riêng.

## Build giao diện

```sh
npm run build
```

## Tùy chỉnh

Tên Minh Nghĩa, Đinh Huòng, ngày cưới và hai địa chỉ bản đồ được cấu hình trong `apps/wedding-invitation/src/app/useInvitation.js` và `apps/admin/src/app/useAdminDashboard.js`. Admin hiện chưa có xác thực, vì vậy chỉ dùng trong môi trường phát triển nội bộ.