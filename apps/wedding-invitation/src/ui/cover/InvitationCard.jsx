import { ArrowRight, Music } from "lucide-react";
import CurtainWindow from "./CurtainWindow.jsx";

// Tấm thiệp mời ở trang đầu: lời mời, họ tên cô dâu chú rể, ngày cưới
// và nút để vào đọc thông tin chi tiết.
function InvitationCard({
  weddingDetails,
  coverPhoto,
  isLeaving,
  isBusy,
  onEnter,
  hasMusic,
  isCurtainOpen,
  onOpenCurtain,
}) {
  const { groomFullName, brideFullName, dateLong, invitation, initials } =
    weddingDetails;

  return (
    <article
      className={`invitation-card-view${isLeaving ? " is-leaving" : ""}`}
      aria-labelledby="invitation-card-title"
    >
      <span className="invitation-card-border" aria-hidden="true" />
      <CurtainWindow
        photo={coverPhoto}
        alt={`Ảnh cưới của ${groomFullName} và ${brideFullName}`}
        initials={initials}
        isOpen={isCurtainOpen}
        onOpen={onOpenCurtain}
      />
      <p className="invitation-card-eyebrow">{invitation.eyebrow}</p>
      <p className="invitation-card-intro">{invitation.intro}</p>
      <h1 className="invitation-card-names" id="invitation-card-title">
        <span className="invitation-card-person">
          <small>Chú rể</small>
          <strong>{groomFullName}</strong>
        </span>
        <em aria-hidden="true">&</em>
        <span className="invitation-card-person">
          <small>Cô dâu</small>
          <strong>{brideFullName}</strong>
        </span>
      </h1>
      <p className="invitation-card-date">{dateLong}</p>
      <p className="invitation-card-closing">{invitation.closing}</p>
      <button
        type="button"
        className="invitation-card-button"
        onClick={onEnter}
        disabled={isBusy}
      >
        Xem thông tin thiệp
        <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
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
