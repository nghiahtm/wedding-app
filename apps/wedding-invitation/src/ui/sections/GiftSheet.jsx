import BottomSheet from "../shared/BottomSheet.jsx";
import QrCodeList from "./QrCodeList.jsx";

// Bảng trượt chứa mã QR trên điện thoại.
function GiftSheet({ qrCodes, isClosing, onClose }) {
  return (
    <BottomSheet
      id="gift-sheet"
      eyebrow="Hộp mừng cưới"
      title="Gửi chút yêu thương"
      isClosing={isClosing}
      onClose={onClose}
      footer={
        qrCodes.length > 0 && (
          <p className="gift-sheet-tip">
            Nhấn giữ mã QR để lưu ảnh, rồi mở ứng dụng ngân hàng để quét.
          </p>
        )
      }
    >
      <div className="gift-qr gift-sheet-body">
        <QrCodeList qrCodes={qrCodes} />
      </div>
    </BottomSheet>
  );
}

export default GiftSheet;
