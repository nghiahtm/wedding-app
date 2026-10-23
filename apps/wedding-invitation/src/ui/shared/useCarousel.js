import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_WRAP_PX = 40;

// Carousel cuộn ngang bằng scroll-snap (hành vi thuần giao diện):
// theo dõi ảnh đang ở giữa, chuyển ảnh, tự chạy và dừng khi khách tương tác.
export function useCarousel(trackRef, count, autoplayMs = 3000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef(null);
  const touchStartXRef = useRef(0);

  const goTo = useCallback(
    (index) => {
      const track = trackRef.current;
      const slide = track?.children[((index % count) + count) % count];
      if (!slide) return;
      const left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [trackRef, count],
  );

  // Máy tính: mở lên ở ảnh thứ hai để thấy sẵn 3 ảnh (trái, giữa, phải). Điện thoại chỉ hiện 1 ảnh nên bắt đầu từ ảnh đầu.
  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[1];
    if (!slide || count < 3 || !window.matchMedia("(min-width: 761px)").matches) return;
    track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2, behavior: "instant" });
  }, [trackRef, count]);

  // Ảnh nào gần tâm khung nhất là ảnh đang xem.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        [...track.children].forEach((slide, index) => {
          const distance = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - center);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = index;
          }
        });
        setActiveIndex(best);
      });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [trackRef, count]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (count < 2 || isPaused || reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      if (!document.hidden) goTo(activeIndex + 1);
    }, autoplayMs);
    return () => window.clearInterval(timer);
  }, [count, isPaused, autoplayMs, activeIndex, goTo]);

  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  // Dừng khi khách chạm / rê chuột / focus; chạy lại sau vài giây khi rời đi.
  const pause = () => {
    window.clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
  };
  // Đang ở ảnh cuối mà vuốt sang trái tiếp thì quay về ảnh đầu (và ngược lại ở ảnh đầu).
  const wrapOnSwipe = (event) => {
    const dx = event.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(dx) < SWIPE_WRAP_PX) return;
    if (dx < 0 && activeIndex === count - 1) goTo(0);
    else if (dx > 0 && activeIndex === 0) goTo(count - 1);
  };
  const resumeLater = () => {
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), 3000);
  };

  return {
    activeIndex,
    goTo,
    next: () => goTo(activeIndex + 1),
    prev: () => goTo(activeIndex - 1),
    interactionProps: {
      onPointerEnter: pause,
      onPointerLeave: resumeLater,
      onTouchStart: (event) => {
        touchStartXRef.current = event.touches[0].clientX;
        pause();
      },
      onTouchEnd: (event) => {
        wrapOnSwipe(event);
        resumeLater();
      },
      onFocus: pause,
      onBlur: resumeLater,
    },
  };
}
