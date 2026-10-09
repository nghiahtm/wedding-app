import { MessageCircleHeart } from "lucide-react";

// Nút gọn ở góc trái trên điện thoại: đổi dần lời chúc mới nhất, chạm để xem tất cả.
function WishesPill({ count, tickerWish, onOpen }) {
  return (
    <button
      type="button"
      className="wishes-pill"
      onClick={onOpen}
      aria-label={`Xem ${count} lời chúc từ khách mời`}
      aria-controls="wishes-sheet"
    >
      <span className="wishes-pill-icon" aria-hidden="true">
        <MessageCircleHeart size={18} strokeWidth={1.8} />
        <small>{count}</small>
      </span>
      {tickerWish && (
        <span className="wishes-pill-text" key={tickerWish.id} aria-hidden="true">
          <strong>{tickerWish.name}:</strong> {tickerWish.message}
        </span>
      )}
    </button>
  );
}

export default WishesPill;
