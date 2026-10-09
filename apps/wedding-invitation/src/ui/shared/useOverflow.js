import { useEffect, useState } from "react";

// Đo chiều cao phần tử (hành vi thuần giao diện): true khi cao hơn maxHeight.
// ResizeObserver tự đo lại khi nội dung đổi; đổi resetKey khi phần tử được dựng lại.
export function useOverflow(ref, maxHeight, isActive = true, resetKey = null) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!isActive || !element) {
      setIsOverflowing(false);
      return undefined;
    }
    const measure = () => setIsOverflowing(element.offsetHeight > maxHeight);
    measure();
    if (!("ResizeObserver" in window)) return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, maxHeight, isActive, resetKey]);

  return isOverflowing;
}
