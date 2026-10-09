import { useCallback, useEffect, useRef, useState } from "react";
import { listWishes } from "../repositories/wishRepository.js";
import { MOBILE_QUERY, useMediaQuery } from "./useMediaQuery.js";
import { useSheetLock } from "./useSheetLock.js";

const REFRESH_MS = 60000;
const TICKER_MS = 4000;
// Tin mới đến được đánh dấu "Mới" trong khoảng này.
const FRESH_MS = 8000;

// Lời chúc của khách: máy tính hiện khung ở góc trái và tự cuộn;
// điện thoại hiện nút gọn đổi dần lời chúc mới nhất, chạm để mở bảng trượt.
export function useWishes(isActive) {
  const [wishes, setWishes] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [freshId, setFreshId] = useState(null);
  const previousLatestRef = useRef(null);
  const latestId = wishes[0]?.id ?? null;
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const closeSheet = () => setIsSheetOpen(false);
  const rememberTrigger = useSheetLock(isSheetOpen && isMobile, closeSheet);

  const refresh = useCallback(() => {
    listWishes()
      .then(setWishes)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isActive) return undefined;
    refresh();
    const timer = window.setInterval(refresh, REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [isActive, refresh]);

  // Có tin mới hơn tin trước đó: đánh dấu "Mới" và đưa dòng chạy trên điện thoại về tin này.
  useEffect(() => {
    if (!latestId) return undefined;
    const previous = previousLatestRef.current;
    previousLatestRef.current = latestId;
    if (!previous || previous === latestId) return undefined;
    setFreshId(latestId);
    setTickerIndex(0);
    const timer = window.setTimeout(() => setFreshId(null), FRESH_MS);
    return () => window.clearTimeout(timer);
  }, [latestId]);

  useEffect(() => {
    if (!isMobile || wishes.length < 2) return undefined;
    const timer = window.setInterval(
      () => setTickerIndex((index) => (index + 1) % wishes.length),
      TICKER_MS,
    );
    return () => window.clearInterval(timer);
  }, [isMobile, wishes.length]);

  function openSheet(event) {
    rememberTrigger(event);
    setIsSheetOpen(true);
  }

  return {
    wishes,
    latestId,
    freshId,
    isMobile,
    // Khung chỉ tự cuộn khi danh sách dài hơn khung (UI tự đo) và khách không tắt chuyển động.
    canAutoScroll: !reduceMotion,
    isCollapsed,
    toggleCollapsed: () => setIsCollapsed((collapsed) => !collapsed),
    isSheetOpen: isSheetOpen && isMobile,
    openSheet,
    closeSheet,
    tickerWish: wishes[tickerIndex % Math.max(wishes.length, 1)] ?? null,
    refresh,
  };
}
