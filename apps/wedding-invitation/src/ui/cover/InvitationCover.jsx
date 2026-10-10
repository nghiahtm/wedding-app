import InvitationCard from "./InvitationCard.jsx";

// Trang đầu: tấm thiệp mời trên nền giấy ngà; bấm nút để vào nội dung.
function InvitationCover({
  weddingDetails,
  coverPhoto,
  stage,
  onEnter,
  hasMusic,
}) {
  const isLeaving = stage === "leaving";

  return (
    <main className={`invitation-cover${isLeaving ? " is-leaving" : ""}`}>
      <span className="cover-frame" aria-hidden="true" />
      <InvitationCard
        weddingDetails={weddingDetails}
        coverPhoto={coverPhoto}
        isLeaving={isLeaving}
        isBusy={stage !== "card"}
        onEnter={onEnter}
        hasMusic={hasMusic}
      />
    </main>
  );
}

export default InvitationCover;
