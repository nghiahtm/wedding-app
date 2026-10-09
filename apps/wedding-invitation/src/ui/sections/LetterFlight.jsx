import { createPortal } from "react-dom";

// Hiệu ứng sau khi gửi lời chúc: lá thư gấp vào phong bì, dán tim rồi bay đi.
// Render ra body để luôn nằm giữa màn hình (section cha có transform nên fixed không bám màn hình).
function LetterFlight() {
  return createPortal(
    <div className="letter-flight" aria-hidden="true">
      <div className="letter-plane">
        <span className="letter-env-back" />
        <span className="letter-paper">
          <i />
          <i />
          <i />
        </span>
        <span className="letter-env-front" />
        <span className="letter-env-flap" />
        <span className="letter-seal">♥</span>
      </div>
      <span className="letter-trail">
        <i>♥</i>
        <i>♥</i>
        <i>♥</i>
      </span>
    </div>,
    document.body,
  );
}

export default LetterFlight;
