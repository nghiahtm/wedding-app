import RevealSection from "../shared/RevealSection.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";

// Ảnh thiệp mời của nhà trai và nhà gái; ẩn khi chưa có ảnh nào.
function InvitationCardsSection({ invitationPhotos, revealed }) {
  const cards = [
    { side: "groom", label: "Nhà trai", photo: invitationPhotos.groom },
    { side: "bride", label: "Nhà gái", photo: invitationPhotos.bride },
  ].filter((card) => card.photo);
  if (cards.length === 0) return null;

  return (
    <RevealSection id="cards" className="cards" from="left" revealed={revealed}>
      <SectionTitle eyebrow="Thiệp cưới">
        Thiệp mời
        <br />
        hai họ.
      </SectionTitle>
      <div className="invitation-cards">
        {cards.map((card) => (
          <figure className="invitation-card" key={card.side}>
            <a
              href={card.photo.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Xem thiệp ${card.label}`}
            >
              <img src={card.photo.url} alt={`Thiệp cưới ${card.label}`} />
            </a>
            <figcaption>{card.label}</figcaption>
          </figure>
        ))}
      </div>
    </RevealSection>
  );
}

export default InvitationCardsSection;
