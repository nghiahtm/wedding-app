import { useEffect, useState } from "react";

// Theo dõi mục đang nằm giữa màn hình để header tô sáng liên kết tương ứng.
export function useActiveSection(sectionIds, isActive) {
  const [activeId, setActiveId] = useState(null);
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    if (!isActive || !("IntersectionObserver" in window)) return undefined;
    const ids = idsKey.split(",");
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActiveId(ids.find((id) => visible.has(id)) ?? null);
      },
      // Dải hẹp quanh 40% chiều cao màn hình: mục nào đi qua dải này là mục đang xem.
      { rootMargin: "-40% 0px -55% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isActive, idsKey]);

  return activeId;
}
