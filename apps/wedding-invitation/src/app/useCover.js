import { useState } from "react";

// Từ lúc kéo ảnh ra tới khi vào nội dung: ảnh phóng to, thiệp mờ dần.
const LEAVE_MS = 1700;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// State riêng của trang đầu (tấm thiệp mời):
// stage "card" → "leaving" (kéo ảnh ra) → "open" (nội dung).
// onEnterStart chạy ngay trong sự kiện bấm nút, ví dụ bật nhạc nền.
export function useCover(onEnterStart) {
  const [stage, setStage] = useState("card");

  function enterInvitation() {
    if (stage !== "card") return;
    onEnterStart?.();
    if (prefersReducedMotion()) {
      setStage("open");
      return;
    }
    setStage("leaving");
    window.setTimeout(() => setStage("open"), LEAVE_MS);
  }

  return { stage, isOpen: stage === "open", enterInvitation };
}
