import { useState } from "react";

// Nếu rèm chưa mở khi bấm nút: chờ rèm lay rồi mở gần hết (hiệu ứng rèm dài 2,8 giây) mới kéo ảnh ra.
const CURTAIN_LEAD_MS = 2100;
// Từ lúc kéo ảnh ra tới khi vào nội dung: ảnh phóng to, thiệp mờ dần.
const LEAVE_MS = 1700;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// State riêng của trang đầu (tấm thiệp mời):
// stage "card" → "revealing" (đang mở rèm) → "leaving" (kéo ảnh ra) → "open" (nội dung).
// onEnterStart chạy ngay trong sự kiện bấm nút, ví dụ bật nhạc nền.
export function useCover(onEnterStart) {
  const [stage, setStage] = useState("card");
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  function openCurtain() {
    setIsCurtainOpen(true);
  }

  function leave() {
    setStage("leaving");
    window.setTimeout(() => setStage("open"), LEAVE_MS);
  }

  function enterInvitation() {
    if (stage !== "card") return;
    onEnterStart?.();
    if (prefersReducedMotion()) {
      setIsCurtainOpen(true);
      setStage("open");
      return;
    }
    if (isCurtainOpen) {
      leave();
      return;
    }
    setIsCurtainOpen(true);
    setStage("revealing");
    window.setTimeout(leave, CURTAIN_LEAD_MS);
  }

  return {
    stage,
    isOpen: stage === "open",
    isCurtainOpen,
    openCurtain,
    enterInvitation,
  };
}
