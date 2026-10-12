import { Gift } from "lucide-react";
import RevealSection from "../shared/RevealSection.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";
import GiftDialog from "./GiftDialog.jsx";

function buildQrCodes(weddingDetails, qrPhotos, accounts) {
  return [
    { side: "groom", label: "Chú rể", name: weddingDetails.groomName, photo: qrPhotos.groom, account: accounts.groom },
    { side: "bride", label: "Cô dâu", name: weddingDetails.brideName, photo: qrPhotos.bride, account: accounts.bride },
  ].filter((qr) => qr.photo);
}

// Hộp quà: bấm mở popup mã QR (GiftDialog) ở giữa màn hình.
function GiftSection({ weddingDetails, qrPhotos, accounts, gift, revealed }) {
  const qrCodes = buildQrCodes(weddingDetails, qrPhotos, accounts);

  return (
    <>
      <RevealSection id="gift" className="gift" from="right" revealed={revealed}>
        <SectionTitle>
          Gửi chút yêu thương
        </SectionTitle>
        <p className="gift-copy">
          Sự hiện diện của bạn là món quà quý nhất. Nếu muốn gửi lời chúc từ
          xa, hãy mở hộp quà nhé.
        </p>
        <button
          type="button"
          className={`gift-box${gift.isOpen ? " is-open" : ""}`}
          onClick={gift.open}
          aria-haspopup="dialog"
          aria-expanded={gift.isOpen}
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
            Chạm để mở hộp quà
          </span>
        </button>
      </RevealSection>
      {gift.isOpen && (
        <GiftDialog qrCodes={qrCodes} isClosing={gift.isClosing} onClose={gift.close} />
      )}
    </>
  );
}

export default GiftSection;
