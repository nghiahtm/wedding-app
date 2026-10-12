import WatercolorLeaves from "../shared/WatercolorLeaves.jsx";

// Đầu trang: tên cô dâu chú rể trên tấm ảnh polaroid nghiêng có băng dính, hoa khô và dấu sáp hình tim.
function HeroSection({ weddingDetails, coverPhoto }) {
  const { groomName, brideName, dateShort, dateLong } = weddingDetails;

  return (
    <section className="hero" id="home">
      <WatercolorLeaves className="hero-leaves" />
      <p className="hero-eyebrow">Thư mời tiệc cưới</p>
      <h1 className="hero-names">
        <span>{groomName}</span>
        <em aria-hidden="true">&</em>
        <span>{brideName}</span>
      </h1>
      <figure className="hero-polaroid">
        <span className="hero-tape" aria-hidden="true" />
        <div className="hero-polaroid-photo">
          {coverPhoto ? (
            <img src={coverPhoto.url} alt={`Ảnh cưới của ${groomName} và ${brideName}`} />
          ) : (
            <span className="hero-polaroid-empty">Ảnh cưới của chúng mình</span>
          )}
        </div>
        <img className="hero-flower" src="/images/flower2-decoration.webp" alt="" aria-hidden="true" />
        <span className="hero-seal" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 18.5C7 14.6 5 12 5 9.3 5 7.3 6.5 6 8.3 6c1.5 0 2.7.8 3.7 2.2C13 6.8 14.2 6 15.7 6 17.5 6 19 7.3 19 9.3c0 2.7-2 5.3-7 9.2z" />
          </svg>
        </span>
      </figure>
      <p className="hero-ceremony">Lễ Thành Hôn</p>
      <p className="hero-date" aria-label={dateLong}>
        {dateShort}
      </p>
    </section>
  );
}

export default HeroSection;
