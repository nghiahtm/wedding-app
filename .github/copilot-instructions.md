# Project Notes

- This repository is an npm-workspaces monorepo with `apps/api`, `apps/wedding-invitation`, and `apps/admin`.
- The API uses Node.js, Express, Mongoose, and MongoDB. Read local configuration from the root `.env` file.
- Both frontend applications use React and Vite. Keep their UI responsive and in Vietnamese.
- In each frontend, keep HTTP calls in `src/api`, data normalization in `src/models`, data access in `src/repositories`, app state/business logic in `src/app`, and presentational components in `src/ui`. UI components receive data and callbacks through props and do not call APIs or own business logic.
- Run all local services with `npm run dev`; read setup and environment instructions in `README.md`.
- Do not commit secrets, `.env` files, or generated `node_modules` and `dist` folders.
- The wedding names, date, and venue are sample content and should be replaced for a real invitation.

## Quy tắc cấu trúc (giữ đồng bộ với `CLAUDE.md`)

- Mỗi file code (JS, JSX, CSS) tối đa 200 dòng; sắp vượt thì tách component, hook hoặc file CSS.
- Mọi dữ liệu frontend, kể cả dữ liệu cố định (tên, ngày, địa điểm, danh sách mục điều hướng), đặt trong `src/repositories/`; `src/app/` không khai báo dữ liệu.
- Thiệp: bìa có UI riêng `ui/cover/` và state riêng `app/useCover.js`; header `ui/layout/Masthead.jsx` lấy mục từ `repositories/sectionRepository.js`; mỗi mục một file trong `ui/sections/` và một file CSS trong `styles/`.
- `app/useInvitation.js` chỉ ghép các hook con; mỗi hook một trách nhiệm.
- CSS: mỗi quy tắc một dòng, thứ tự import trong `styles/index.css` là thứ tự cascade.
- Xem đầy đủ cấu trúc, cách thêm mục mới và checklist trong `CLAUDE.md`.
