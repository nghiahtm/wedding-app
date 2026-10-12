import { useState } from "react";
import { useSheetLock } from "./useSheetLock.js";

// Thời gian hiệu ứng đóng popup.
const CLOSE_MS = 280;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hộp quà: bấm để mở popup mã QR ở giữa màn hình (mọi thiết bị).
export function useGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  function close() {
    if (!isOpen || isClosing) return;
    if (prefersReducedMotion()) {
      setIsOpen(false);
      return;
    }
    setIsClosing(true);
    window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSE_MS);
  }

  const rememberTrigger = useSheetLock(isOpen, close);

  function open(event) {
    if (isOpen) return;
    rememberTrigger(event);
    setIsOpen(true);
  }

  return { isOpen, isClosing, open, close };
}
