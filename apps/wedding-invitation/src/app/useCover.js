import { useEffect, useRef, useState } from "react";

// Thời gian hiệu ứng rời bìa trước khi vào nội dung (khớp open-effects.css).
const LEAVE_MS = 900;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// State riêng của trang đầu (tấm thiệp mời): card → leaving → open.
// onEnterStart chạy ngay trong sự kiện bấm nút, ví dụ bật nhạc nền.
export function useCover(onEnterStart) {
  const [phase, setPhase] = useState("card");
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function enterInvitation() {
    if (phase !== "card") return;
    onEnterStart?.();
    if (prefersReducedMotion()) {
      setPhase("open");
      return;
    }
    setPhase("leaving");
    timerRef.current = window.setTimeout(() => setPhase("open"), LEAVE_MS);
  }

  return { isOpen: phase === "open", isLeaving: phase === "leaving", enterInvitation };
}
