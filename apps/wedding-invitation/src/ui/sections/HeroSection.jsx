import { Heart } from "lucide-react";
import FloralSprig from "../shared/FloralSprig.jsx";

// Đầu trang: tên chú rể và cô dâu hai bên khung ảnh vòm (máy tính), xếp dọc trên điện thoại.
function HeroSection({ weddingDetails, coverPhoto }) {
  const { groomName, brideName, dateShort, dateLong } = weddingDetails;

  return (
    <section className="hero" id="home">
      <p className="eyebrow hero-eyebrow">Trân trọng kính mời</p>
      <div className="hero-stage">
        <h1 className="hero-names">
          <span className="hero-name hero-name-groom">{groomName}</span>
          <em className="hero-and">&</em>
          <span className="hero-name hero-name-bride">{brideName}</span>
        </h1>
        <div className="hero-arch">
          <FloralSprig className="hero-flowers hero-flowers-top" />
          <div className="hero-arch-frame">
            {coverPhoto ? (
              <img src={coverPhoto.url} alt={`Ảnh cưới của ${groomName} và ${brideName}`} />
            ) : (
              <span className="hero-arch-empty">Ảnh cưới của chúng mình</span>
            )}
          </div>
          <FloralSprig className="hero-flowers hero-flowers-bottom" />
        </div>
      </div>
      <p className="hero-date" aria-label={dateLong}>
        {dateShort}
      </p>
      <p className="hero-note">Một ngày vui sẽ trọn vẹn hơn khi có bạn bên cạnh.</p>
      <a className="text-link" href="#details">
        Tham dự ngày vui{" "}
        <span className="link-icon" aria-hidden="true">
          <Heart size={15} strokeWidth={1.8} fill="currentColor" />
        </span>
      </a>
    </section>
  );
}

export default HeroSection;
