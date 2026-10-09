const SETTLE_FALLBACK_MS = 1200;
const TOLERANCE_PX = 4;

function scrollMarginTop(element) {
  return parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
}

function waitForScrollEnd(callback) {
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", finish);
    callback();
  };
  window.addEventListener("scrollend", finish, { once: true });
  window.setTimeout(finish, SETTLE_FALLBACK_MS);
}

// Cuộn tới một mục. Nếu ảnh tải xong trong lúc cuộn làm trang dài ra và lệch vị trí,
// cuộn chỉnh lại một lần sau khi dừng.
export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const behavior = reduceMotion ? "auto" : "smooth";

  element.scrollIntoView({ behavior, block: "start" });
  window.history.replaceState(null, "", `#${id}`);

  waitForScrollEnd(() => {
    const offset = element.getBoundingClientRect().top - scrollMarginTop(element);
    const atPageEnd =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - TOLERANCE_PX;
    if (Math.abs(offset) > TOLERANCE_PX && !atPageEnd) {
      element.scrollIntoView({ behavior, block: "start" });
    }
  });
}
