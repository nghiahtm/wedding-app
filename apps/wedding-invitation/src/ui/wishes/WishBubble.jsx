// Một lời chúc dạng bong bóng tin nhắn: tên, thời gian (dd/mm/yy hh:mm) và nội dung.
// isFresh: tin vừa đến, có nhãn "Mới" và sáng nhẹ vài giây.
function WishBubble({ wish, isFresh = false }) {
  return (
    <li className={`wish-bubble${isFresh ? " is-fresh" : ""}`}>
      <span className="wish-avatar" aria-hidden="true">
        {wish.name.trim().charAt(0).toUpperCase()}
      </span>
      <div className="wish-body">
        <p className="wish-meta">
          <strong>{wish.name}</strong>
          {isFresh && <span className="wish-new">Mới</span>}
          <time>{wish.timeLabel}</time>
        </p>
        <p className="wish-message">{wish.message}</p>
      </div>
    </li>
  );
}

export default WishBubble;
