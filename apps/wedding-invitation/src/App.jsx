import { useInvitation } from "./app/useInvitation.js";
import InvitationCover from "./ui/cover/InvitationCover.jsx";
import InvitationContent from "./ui/InvitationContent.jsx";

function App() {
  const invitation = useInvitation();
  if (!invitation.isOpen) return <InvitationCover {...invitation.cover} />;
  return <InvitationContent {...invitation.content} />;
}

export default App;
