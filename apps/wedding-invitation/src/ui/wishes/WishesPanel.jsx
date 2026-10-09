import { ChevronDown, MessageCircleHeart } from "lucide-react";
import { useRef } from "react";
import { useOverflow } from "../shared/useOverflow.js";
import WishBubble from "./WishBubble.jsx";

const SECONDS_PER_WISH = 4;
// Vùng hiển thị của khung (260px trừ 2 × 10px đệm), khớp với wishes.css.
const VISIBLE_HEIGHT = 240;

// Khung lời chúc ở góc trái dưới trên máy tính/iPad.
// Chỉ tự cuộn khi danh sách dài hơn khung; khi đó thêm một bản sao (ẩn với trình đọc màn hình)
// nối phía sau để vòng lặp liền mạch. Rê chuột vào thì dừng.
// Có tin mới (latestId đổi) thì dựng lại vòng cuộn để bắt đầu từ tin mới nhất ở trên cùng.
function WishesPanel({ wishes, latestId, freshId, canAutoScroll, isCollapsed, onToggleCollapsed }) {
  const listRef = useRef(null);
  const isOverflowing = useOverflow(listRef, VISIBLE_HEIGHT, !isCollapsed, latestId);
  const autoScroll = canAutoScroll && isOverflowing;

  return (
    <aside
      className={`wishes-panel${isCollapsed ? " is-collapsed" : ""}`}
      aria-label="Lời chúc từ khách mời"
    >
      <button
        type="button"
        className="wishes-panel-header"
        onClick={onToggleCollapsed}
        aria-expanded={!isCollapsed}
      >
        <MessageCircleHeart size={16} strokeWidth={1.8} aria-hidden="true" />
        <span>Lời chúc</span>
        <small>{wishes.length}</small>
        <ChevronDown className="wishes-panel-chevron" size={16} aria-hidden="true" />
      </button>
      {!isCollapsed && (
        <div className={`wishes-viewport${autoScroll ? " is-auto" : ""}`}>
          <div
            key={latestId}
            className={`wishes-track${autoScroll ? " is-scrolling" : ""}`}
            style={{ "--scroll-duration": `${wishes.length * SECONDS_PER_WISH}s` }}
          >
            <ul className="wishes-list" ref={listRef}>
              {wishes.map((wish) => (
                <WishBubble wish={wish} isFresh={wish.id === freshId} key={wish.id} />
              ))}
            </ul>
            {autoScroll && (
              <ul className="wishes-list" aria-hidden="true">
                {wishes.map((wish) => (
                  <WishBubble wish={wish} key={`copy-${wish.id}`} />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

export default WishesPanel;
