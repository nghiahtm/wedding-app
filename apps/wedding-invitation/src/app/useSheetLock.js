import { useEffect, useRef } from "react";

// Khi bảng trượt mở: khóa cuộn trang phía sau, đóng bằng Esc,
// đóng xong trả focus về nút đã mở (gọi rememberTrigger trong sự kiện bấm).
export function useSheetLock(isOpen, onClose) {
  const triggerRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function rememberTrigger(event) {
    triggerRef.current = event?.currentTarget ?? null;
  }

  return rememberTrigger;
}
