import { fetchVisitSummary, postVisit } from "../api/visits.js";
import { createVisitSummaryModel } from "../models/VisitSummary.js";

const VISITOR_KEY = "wedding-visitor-id";
const SESSION_KEY = "wedding-visit-recorded";

function readStorage(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    // Trình duyệt chặn lưu trữ (chế độ riêng tư): vẫn ghi nhận lượt xem, chỉ không nhớ được khách.
  }
}

// Mã ẩn danh lưu trong trình duyệt để phân biệt khách; không chứa thông tin cá nhân.
function getVisitorId() {
  const saved = readStorage(localStorage, VISITOR_KEY);
  if (saved) return saved;
  const created = crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  writeStorage(localStorage, VISITOR_KEY, created);
  return created;
}

// Mỗi phiên trình duyệt chỉ gửi một lần; API tự bỏ qua lượt lặp trong 30 phút.
export async function recordVisit() {
  if (readStorage(sessionStorage, SESSION_KEY)) return;
  await postVisit(getVisitorId());
  // Chỉ đánh dấu khi đã gửi thành công, để lần tải lại sau còn thử lại nếu API/MongoDB đang lỗi.
  writeStorage(sessionStorage, SESSION_KEY, "1");
}

export async function getVisitSummary() {
  return createVisitSummaryModel(await fetchVisitSummary());
}
