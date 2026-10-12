import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import QrCodeList from "./QrCodeList.jsx";

// Popup giữa màn hình chứa mã QR mừng cưới; chạm nền mờ hoặc nút X để đóng.
function GiftDialog({ qrCodes, isClosing, onClose }) {
  const closeRef = useRef(null);

  // Đưa focus vào nút đóng nhưng không cho trình duyệt cuộn trang (autoFocus làm trang nhảy).
  useEffect(() => closeRef.current?.focus({ preventScroll: true }), []);

  return (
    <div
      className={`gift-dialog-backdrop${isClosing ? " is-closing" : ""}`}
      onClick={onClose}
    >
      <div
        className="gift-dialog"
        id="gift-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="gift-dialog-header">
          <h3 id="gift-dialog-title">Hộp quà mừng</h3>
          <button
            type="button"
            className="gift-dialog-close"
            ref={closeRef}
            onClick={onClose}
            aria-label="Đóng hộp quà mừng"
          >
            <X size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
        <div className="gift-dialog-body">
          <QrCodeList qrCodes={qrCodes} />
        </div>
      </div>
    </div>
  );
}

export default GiftDialog;
