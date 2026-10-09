import { Gift } from "lucide-react";
import RevealSection from "../shared/RevealSection.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";
import GiftSheet from "./GiftSheet.jsx";
import QrCodeList from "./QrCodeList.jsx";

function buildQrCodes(weddingDetails, qrPhotos) {
  return [
    { side: "groom", label: "Chú rể", name: weddingDetails.groomName, photo: qrPhotos.groom },
    { side: "bride", label: "Cô dâu", name: weddingDetails.brideName, photo: qrPhotos.bride },
  ].filter((qr) => qr.photo);
}

// Hộp quà: điện thoại mở bảng trượt (GiftSheet), iPad/máy tính mở ngay trong trang.
function GiftSection({ weddingDetails, qrPhotos, gift, revealed }) {
  const qrCodes = buildQrCodes(weddingDetails, qrPhotos);

  return (
    <>
      <RevealSection id="gift" className="gift" from="right" revealed={revealed}>
        <SectionTitle eyebrow="Hộp mừng cưới">
          Gửi chút
          <br />
          yêu thương.
        </SectionTitle>
        <p className="gift-copy">
          Sự hiện diện của bạn là món quà quý nhất. Nếu muốn gửi lời chúc từ
          xa, hãy mở hộp quà nhé.
        </p>
        <button
          type="button"
          className={`gift-box${gift.isOpen ? " is-open" : ""}${gift.isClosing ? " is-closing" : ""}`}
          onClick={gift.toggle}
          aria-expanded={gift.isOpen}
          aria-controls={gift.isSheet ? "gift-sheet" : "gift-qr"}
        >
          <span className="gift-art" aria-hidden="true">
            <span className="gift-lid">
              <span className="gift-bow" />
            </span>
            <span className="gift-body" />
            <span className="gift-sparkles">✦ ♥ ✦</span>
          </span>
          <span className="gift-label">
            <Gift size={15} strokeWidth={1.8} aria-hidden="true" />
            {gift.isOpen && !gift.isClosing ? "Đóng hộp quà" : "Chạm để mở hộp quà"}
          </span>
        </button>
        {!gift.isSheet && (
          <div
            className={`gift-qr${gift.isClosing ? " is-closing" : ""}`}
            id="gift-qr"
            hidden={!gift.isOpen}
          >
            <QrCodeList qrCodes={qrCodes} />
          </div>
        )}
      </RevealSection>
      {gift.isSheet && gift.isOpen && (
        <GiftSheet
          qrCodes={qrCodes}
          isClosing={gift.isClosing}
          onClose={gift.close}
        />
      )}
    </>
  );
}

export default GiftSection;
