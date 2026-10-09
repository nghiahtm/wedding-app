import { useState } from "react";
import { MOBILE_QUERY, useMediaQuery } from "./useMediaQuery.js";
import { useSheetLock } from "./useSheetLock.js";

// Thời gian hiệu ứng đóng: QR chui lại vào hộp (trong trang) hoặc bảng trượt xuống (điện thoại).
const CLOSE_INLINE_MS = 650;
const CLOSE_SHEET_MS = 320;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hộp quà: điện thoại mở bảng trượt; iPad và máy tính mở ngay trong trang.
export function useGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);

  function close() {
    if (!isOpen || isClosing) return;
    if (prefersReducedMotion()) {
      setIsOpen(false);
      return;
    }
    setIsClosing(true);
    window.setTimeout(
      () => {
        setIsOpen(false);
        setIsClosing(false);
      },
      isMobile ? CLOSE_SHEET_MS : CLOSE_INLINE_MS,
    );
  }

  const rememberTrigger = useSheetLock(isOpen && isMobile, close);

  function toggle(event) {
    if (isClosing) return;
    if (isOpen) {
      close();
      return;
    }
    rememberTrigger(event);
    setIsOpen(true);
  }

  return { isOpen, isClosing, isSheet: isMobile, toggle, close };
}
