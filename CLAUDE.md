# Quy tắc dự án wedding-app

Monorepo npm workspaces: `apps/api` (Express + MongoDB), `apps/wedding-invitation` (thiệp, React + Vite), `apps/admin` (quản trị, React + Vite, chỉ chạy local). Giao diện tiếng Việt, responsive desktop / iPad / mobile. Đọc `README.md` để chạy và deploy.

## 1. Giới hạn kích thước file

- **Mỗi file code tối đa 200 dòng** (JS, JSX, CSS). Sắp vượt thì tách tiếp, không dồn thành file lớn.
- Mỗi component, hook hoặc file CSS chỉ làm **một việc**. Hàm/hook dài hơn khoảng 60 dòng là dấu hiệu cần tách.
- Kiểm tra trước khi xong việc:
  ```sh
  git ls-files --cached --others --exclude-standard apps | grep -E '\.(js|jsx|css)$' | xargs wc -l | sort -rn | head
  ```

## 2. Tầng frontend (cả admin và wedding-invitation)

| Thư mục | Được làm | Không được làm |
|---|---|---|
| `src/api/` | Gọi HTTP, đọc envelope `{ data, errors, message }` | Chứa state, dữ liệu cố định |
| `src/models/` | Chuẩn hóa response thành model | Gọi API |
| `src/repositories/` | **Nơi duy nhất cung cấp dữ liệu**: kết hợp API + model, và chứa cả dữ liệu cục bộ (tên, ngày cưới, địa điểm, danh sách mục điều hướng, giới hạn...) | Chứa state React |
| `src/app/` | State, nghiệp vụ, validation, hiệu ứng trình duyệt (audio, scroll, observer) | Khai báo dữ liệu cố định; render JSX |
| `src/ui/` | Hiển thị props, gọi callback; hành vi thuần DOM của chính nó (focus, cuộn ngang) | Gọi API/repository, giữ nghiệp vụ |
| `App.jsx` | Nối hook tổng với UI | Logic |

## 3. Cấu trúc thiệp (`apps/wedding-invitation/src`)

```
app/
  useInvitation.js        chỉ ghép các hook con, trả { isOpen, cover, content }
  useInvitationData.js    tải ảnh, nhạc, ghi lượt xem
  useCover.js             state riêng của trang đầu: chưa mở → đã mở (bấm "Mở thiệp" vào nội dung ngay)
  scrollToSection.js      cuộn tới mục, tự chỉnh nếu trang bị đẩy lệch
  useScrollReveal.js, calendarMonth.js (lưới lịch tháng), useRsvpForm.js + rsvpValidation.js, useGift.js, useBackgroundMusic.js
  useWishes.js            lời chúc: tải 20 lời mới nhất, tự làm mới, bảng trượt trên điện thoại
  useMediaQuery.js, useSheetLock.js   dùng chung: nhận biết điện thoại, khóa cuộn + Esc cho bảng trượt
repositories/
  weddingRepository.js    tên, ngày, lời mời, nơi tổ chức tiệc (venue: một bản đồ), địa chỉ nhà hai bên (homes), thông tin tiệc/lễ (event)
  photoRepository.js, musicRepository.js, rsvpRepository.js, visitRepository.js, wishRepository.js
  familyRepository.js     tên bố mẹ (API /api/wedding, nhập ở admin) + tên cô dâu chú rể, địa chỉ nhà
  giftRepository.js       tài khoản mừng cưới hai bên (API /api/wedding, nhập ở admin), hiện dưới mã QR
ui/
  cover/                  InvitationCover (nền be + cánh hoa rơi), InvitationCard (tên, ngày, lời mời, nút Mở thiệp), FallingPetals (hoa khô là ảnh public/images/flower2-decoration.webp)
  layout/                 Footer, MusicToggle (không có thanh điều hướng)
  sections/               mỗi mục một file: Hero (polaroid + hoa khô + dấu sáp), Story (WeddingInfo: tấm giấy "Thông tin lễ cưới" theo mẫu: bố mẹ, tên, nơi/giờ làm lễ, ngày + EventInfo: "Thông tin tiệc cưới" có WeddingCalendar), Album, Details,
                          Rsvp(+LetterFlight), Gift(+GiftSheet, QrCodeList)
  wishes/                 WishesCorner (máy tính: WishesPanel góc trái tự cuộn; điện thoại: WishesPill + sheet), WishBubble
  shared/                 WatercolorLeaves (lá màu nước nền Hero và cạnh thẻ tiệc cưới), RevealSection, SectionTitle, TextField, BottomSheet, FloralSprig
  InvitationContent.jsx   xếp các mục theo thứ tự
styles/
  index.css               import theo thứ tự cascade
  base.css, typography.css (font + h1–h6), cover.css, invitation-card.css, hero.css, story.css, album.css,
  details.css, wedding-info.css, event-info.css, rsvp.css, letter-flight.css, gift.css, bottom-sheet.css, wishes.css,
  music.css, footer.css
```

## 3b. Cấu trúc admin (`apps/admin/src`)

```
app/          useAdminNavigation (tab đang chọn ↔ #hash), useAdminDashboard (hồi đáp, làm mới, lọc) + guestFilters (trạng thái, tìm không dấu, khoảng ngày),
              useFamilyForm (tên bố mẹ hai bên), useGiftForm (tài khoản mừng cưới hai bên), usePhotoManager, useMusicManager
repositories/ navigationRepository (danh sách tab), rsvp/photo/music/visit/weddingRepository
ui/           AdminDashboard (khung), layout/ (Sidebar, Topbar, MobileTabBar, PageHeading, tabIcons),
              overview/ (OverviewTab, StatsGrid, RecentRsvps), info/ (InfoTab, GiftInfoForm), guests/ (GuestsTab, GuestTable),
              shared/StatusPill, PhotoManager, MusicManager
styles/       index.css → base, layout, page, overview, guests, info, photos, music
```

Thêm tab mới: thêm `{ id, label, description }` vào `navigationRepository.js`, icon vào `ui/layout/tabIcons.js`, rồi render nội dung theo `activeTab` trong `AdminDashboard.jsx`.

### Thêm một mục mới vào thiệp

1. (Thiệp không còn thanh điều hướng nên không cần khai báo mục ở repository.)
2. Tạo `ui/sections/<Ten>Section.jsx`, bọc bằng `RevealSection` với `id` trùng id ở bước 1.
3. Tạo `styles/<ten>.css` và import vào `styles/index.css` (đặt trước `cover.css`). Tiêu đề h1–h6 đã có kiểu chung trong `styles/typography.css`; chỉ chỉnh cỡ chữ theo ngữ cảnh trong file của mục.
4. Thêm component vào `ui/InvitationContent.jsx` đúng vị trí; state mới thì viết hook riêng trong `app/` rồi ghép ở `useInvitation.js`.

## 4. CSS

- Mỗi phần một file trong `styles/`; **mỗi quy tắc một dòng**, `@media` của phần nào nằm trong file của phần đó.
- Thứ tự import trong `styles/index.css` quyết định cascade: không đổi tùy tiện.
- Tông màu thiệp: xanh sage nhẹ nhàng (bảng màu theo mẫu minimal-xanh-sage). Dùng biến trong `styles/base.css` (`--blush-0..3` nền xanh nhạt, `--accent` xanh sage, `--accent-deep` xanh đậm, `--rose-gold` chi tiết xanh nhạt, `--ink` chữ nâu tím, `--muted`, `--line`) thay vì viết mã màu mới. Ảnh chủ đạo trắng đen, không thêm màu rực.
- Tiêu đề mỗi mục dùng `ui/shared/SectionTitle.jsx` (dòng chữ nhỏ + tiêu đề + họa tiết tim) để đồng bộ.
- Font: mọi tiêu đề và chữ thư pháp dùng `var(--font-heading)` khai báo duy nhất trong `styles/typography.css` (Tempting, dự phòng Great Vibes; file font đặt ở `public/fonts/`). Playfair Display cho chữ nghiêng nhỏ; DM Sans cho nội dung. Đổi font tiêu đề thì chỉ sửa `typography.css`.
- Mọi hiệu ứng phải có nhánh `@media (prefers-reduced-motion: reduce)`.

## 5. API và bảo mật

- Response luôn theo `DataResponse<T>`: `{ data, errors, message }`.
- Thao tác ghi ảnh/nhạc và xem thống kê chi tiết đi qua `requireAdmin` (riêng `GET /api/visits/summary` công khai, chỉ trả số đếm cho chân trang thiệp) (header `X-Admin-Key` khớp `ADMIN_API_KEY`). Không đưa khóa vào mã trình duyệt: proxy của admin tự gắn.
- File tải lên được nhận dạng theo chữ ký file, không tin `Content-Type`.
- Docker production chỉ gồm `mongodb`, `api`, `wedding-invitation`; admin chạy local và trỏ tới production bằng `ADMIN_API_TARGET`.
- Không commit `.env`, `node_modules`, `dist`.

## 6. Trước khi báo xong

- `npx vite build` trong app đã sửa phải chạy được.
- Với thay đổi giao diện: chụp màn hình desktop (1280px) và mobile (400px) để kiểm tra. Với refactor thuần: so ảnh trước/sau phải giống nhau.
- Không file nào vượt 200 dòng (lệnh ở mục 1).
