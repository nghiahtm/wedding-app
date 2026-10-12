import PetalFall from "../shared/PetalFall.jsx";
import InvitationCard from "./InvitationCard.jsx";

// Trang đầu: tấm thiệp mời trên nền xanh nhạt; bấm "Mở thiệp" để thiệp bay lên rồi vào nội dung.
function InvitationCover({ weddingDetails, onEnter, isLeaving, hasMusic }) {
  return (
    <main className={`invitation-cover${isLeaving ? " is-leaving" : ""}`}>
      <PetalFall />
      <InvitationCard weddingDetails={weddingDetails} onEnter={onEnter} hasMusic={hasMusic} />
    </main>
  );
}

export default InvitationCover;
