import { X } from "lucide-react";

// Bảng trượt lên từ đáy màn hình (dùng trên điện thoại); chạm nền mờ hoặc nút X để đóng.
// isClosing: đang chạy hiệu ứng trượt xuống trước khi bị gỡ.
function BottomSheet({ id, eyebrow, title, isClosing = false, onClose, children, footer }) {
  const titleId = `${id}-title`;
  return (
    <div
      className={`bottom-sheet-backdrop${isClosing ? " is-closing" : ""}`}
      onClick={onClose}
    >
      <div
        className="bottom-sheet"
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <span className="bottom-sheet-handle" aria-hidden="true" />
        <div className="bottom-sheet-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h3 id={titleId}>{title}</h3>
          </div>
          <button
            type="button"
            className="bottom-sheet-close"
            onClick={onClose}
            aria-label={`Đóng ${title.toLowerCase()}`}
            autoFocus
          >
            <X size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
        {children}
        {footer}
      </div>
    </div>
  );
}

export default BottomSheet;
