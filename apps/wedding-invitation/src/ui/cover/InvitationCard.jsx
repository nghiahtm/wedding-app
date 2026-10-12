import { Flower2, Heart, Music } from "lucide-react";

// Tấm thiệp mời ở trang đầu: tên cô dâu chú rể, ngày cưới, lời mời và nút mở thiệp.
function InvitationCard({ weddingDetails, onEnter, hasMusic }) {
  const { groomFullName, brideFullName, dateLong, invitation } = weddingDetails;

  return (
    <article className="invitation-card-view" aria-labelledby="invitation-card-title">
      <img className="card-sprig card-sprig-top" src="/images/flower2-decoration.webp" alt="" aria-hidden="true" />
      <img className="card-sprig card-sprig-bottom" src="/images/flower2-decoration.webp" alt="" aria-hidden="true" />
      <span className="invitation-card-heart" aria-hidden="true">
        <Heart size={22} fill="currentColor" strokeWidth={0} />
      </span>
      <h1 className="invitation-card-names" id="invitation-card-title">
        <span>{groomFullName}</span>
        <em aria-hidden="true">&</em>
        <span>{brideFullName}</span>
      </h1>
      <p className="invitation-card-divider" aria-hidden="true">
        <Flower2 size={13} strokeWidth={1.5} />
      </p>
      <p className="invitation-card-date">{dateLong}</p>
      <p className="invitation-card-eyebrow">{invitation.eyebrow}</p>
      <p className="invitation-card-guest">Quý khách</p>
      <p className="invitation-card-intro">{invitation.intro}</p>
      <button type="button" className="invitation-card-button" onClick={onEnter}>
        Mở thiệp
      </button>
      {hasMusic && (
        <p className="invitation-card-hint">
          <Music size={13} strokeWidth={1.8} aria-hidden="true" />
          Thiệp có nhạc nền
        </p>
      )}
    </article>
  );
}

export default InvitationCard;
