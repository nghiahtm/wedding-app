import { hasGiftAccount } from "../../models/Gift.js";

// Danh sách mã QR mừng cưới (kèm tài khoản và nút lưu ảnh), hoặc lời nhắn khi chưa có mã nào.
// Bên chưa điền tài khoản ở admin thì ghi "Chú rể / Cô dâu" và tên như cũ.
function QrCodeList({ qrCodes }) {
  if (qrCodes.length === 0) {
    return (
      <p className="gift-empty">
        Chúng mình đang chuẩn bị mã QR, bạn quay lại sau nhé. Cảm ơn tấm lòng
        của bạn!
      </p>
    );
  }

  return qrCodes.map((qr) => (
    <figure className="qr-card" key={qr.side}>
      <img src={qr.photo.url} alt={`Mã QR mừng cưới ${qr.label} ${qr.name}`} />
      <figcaption>
        {hasGiftAccount(qr.account) ? (
          <>
            {qr.account.bank && <span>{qr.account.bank}</span>}
            {qr.account.account && <span className="qr-account">{qr.account.account}</span>}
            {qr.account.holder && <strong>{qr.account.holder}</strong>}
          </>
        ) : (
          <>
            <span>{qr.label}</span>
            <strong>{qr.name}</strong>
          </>
        )}
        <a
          className="qr-save"
          href={qr.photo.url}
          download={`qr-${qr.side}.png`}
          target="_blank"
          rel="noreferrer"
        >
          Lưu QR
        </a>
      </figcaption>
    </figure>
  ));
}

export default QrCodeList;
