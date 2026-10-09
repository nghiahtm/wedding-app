// Danh sách mã QR mừng cưới, hoặc lời nhắn khi chưa có mã nào.
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
        <span>{qr.label}</span>
        <strong>{qr.name}</strong>
      </figcaption>
    </figure>
  ));
}

export default QrCodeList;
