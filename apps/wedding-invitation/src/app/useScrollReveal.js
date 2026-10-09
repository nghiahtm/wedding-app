import { useEffect, useState } from "react";

// Hiện dần các section có [data-scroll-reveal] khi cuộn tới.
// refreshKey đổi (ví dụ khi ảnh tải xong làm xuất hiện section mới) thì quan sát lại.
export function useScrollReveal(isActive, refreshKey) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [revealed, setRevealed] = useState([]);

  useEffect(() => {
    if (!isActive) return undefined;

    const sections = [...document.querySelectorAll("[data-scroll-reveal]")];
    if (sections.length === 0) return undefined;
    if (!("IntersectionObserver" in window)) {
      setRevealed(sections.map((section) => section.id));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const visibleIds = visible.map((entry) => entry.target.id);
        setRevealed((current) => [
          ...current,
          ...visibleIds.filter((id) => !current.includes(id)),
        ]);
        visible.forEach((entry) => observer.unobserve(entry.target));
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    setIsEnabled(true);
    return () => observer.disconnect();
  }, [isActive, refreshKey]);

  return { isEnabled, revealed };
}
