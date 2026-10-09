---
mode: agent
description: Thiết kế hoặc chỉnh sửa giao diện wedding-invitation theo visual system hiện tại của thiệp cưới Minh Nghĩa và Đinh Hường.
---

# Wedding Invitation Design Guide

Đọc prompt này trước khi thiết kế hoặc sửa giao diện trong `apps/wedding-invitation`. Giữ nhất quán với thiệp hiện tại; không tự đổi concept, nội dung cưới hoặc kiến trúc app khi yêu cầu chỉ liên quan đến UI.

## Yêu cầu thiết kế lần này

[MÔ TẢ MÀN HÌNH, COMPONENT HOẶC THAY ĐỔI CẦN LÀM]

## Visual direction

- Phong cách thiệp cưới editorial, lãng mạn, trang nhã; kết hợp chất giấy/thiệp truyền thống với bố cục web hiện đại.
- Palette chính: nền giấy sáng `#fffaf6` / `#f7f4ed`, đỏ son `#a34f43` và các sắc đỏ sáp, vàng champagne cho viền/điểm nhấn, xanh đậm `#27352d` cho chữ nội dung.
- Dùng `Playfair Display` cho tiêu đề giàu cảm xúc; `DM Sans` cho nội dung và điều khiển. Giữ hierarchy rõ, không phóng đại chữ ở các khu vực phụ.
- Có thể dùng đường viền mảnh, vân giấy nhẹ, góc bo vừa phải và bóng mềm. Tránh card dày đặc, gradient phô trương hoặc thêm màu/ornament cạnh tranh với nội dung cưới.
- Nội dung giao diện viết bằng tiếng Việt. Tên, ngày, địa chỉ lấy từ dữ liệu app hiện có; không tạo thêm thông tin cưới chưa được cung cấp.

## Cover thiệp

- Màn hình đầu là bìa/envelope, không bỏ qua để vào thẳng nội dung khi yêu cầu không nói vậy.
- Bìa hiện dùng hai cánh trắng/đỏ có chữ cái đôi và nút ấn sáp đỏ ở giữa. Giữ dấu sáp tròn hơi bất quy tắc, cảm giác dập nổi, có bóng; chữ trên dấu phải rõ và không bị ornament che.
- Nút dấu ở chính giữa là điều khiển mở thiệp. Khi nhấn, hai cánh mở sang hai bên rồi mới hiện nội dung.
- Giữ animation ngắn, có chủ đích; hỗ trợ `prefers-reduced-motion` để bỏ hoặc giảm chuyển động.
- Không biến dấu mở thiệp thành decoration không tương tác; cần dùng được bằng bàn phím, có focus state và accessible label.

## Nội dung và tương tác

- Sau khi mở, giữ thứ tự nội dung: lời mời, câu chuyện, ngày/địa điểm hai nhà, hồi đáp và footer.
- Các section xuất hiện khi cuộn có thể reveal luân phiên từ trái/phải, chỉ chạy một lần mỗi section; không che nội dung nếu JavaScript hoặc `IntersectionObserver` không hỗ trợ.
- Địa chỉ nhà trai/nhà gái hiển thị rõ, mỗi địa chỉ có link bản đồ riêng. Dùng `MapPin` từ `lucide-react` cho link bản đồ; giữ khoảng cách hợp lý giữa địa chỉ và link, thêm accessible name cho từng địa điểm.
- Form RSVP dùng ô input, select và textarea có nền trắng, viền đầy đủ, trạng thái focus rõ. Lỗi validation đặt sát field, làm viền đỏ và có văn bản lỗi dễ đọc.
- Không tự thêm ảnh mẫu giả thành ảnh cưới thật. Nếu cần tài sản hình ảnh, dùng asset thật sẵn có hoặc hỏi người dùng; không để placeholder bị hiểu nhầm là ảnh thật.

## Responsive và accessibility

- Bảo đảm layout ở desktop, tablet và mobile; kiểm tra ít nhất các viewport khoảng 1440px, 800px, 390px và màn nhỏ 320px.
- Không có tràn ngang, chữ bị cắt, nút/link quá nhỏ hoặc overlap. Các hàng địa điểm và RSVP cần xuống cột hợp lý trên màn nhỏ.
- Giữ focus-visible, nhãn điều khiển, trạng thái disabled/loading và tương phản chữ/nền đủ rõ.
- Tôn trọng `prefers-reduced-motion`; hiệu ứng không được chặn thao tác hoặc giữ phần nội dung ở trạng thái ẩn.

## Ranh giới code

- Dữ liệu, state và hành vi thuộc `src/app`; UI nhận props/callback và chỉ trình bày.
- API calls giữ trong `src/api`, chuẩn hóa dữ liệu trong `src/models`, truy xuất dữ liệu qua `src/repositories`.
- Theo style hiện có trong `src/style.css`; ưu tiên CSS hiện tại và `lucide-react`, không thêm dependency mới nếu không thật sự cần.
- Giữ thay đổi trong `apps/wedding-invitation`, trừ khi yêu cầu cần phối hợp API; không chỉnh trang admin hoặc Docker vì một yêu cầu design của thiệp.

## Kiểm tra trước khi kết thúc

- Xem trực tiếp giao diện trên browser nếu dev server khả dụng; kiểm tra cover, trạng thái mở, responsive và tương tác vừa sửa.
- Chạy diagnostics/check hẹp phù hợp. Chỉ chạy build nếu người dùng yêu cầu hoặc đó là bước xác minh được thống nhất cho task.
- Báo ngắn gọn phần design đã đổi và những gì chưa thể xác minh.
