import { useInvitation } from "./app/useInvitation.js";
import InvitationCover from "./ui/cover/InvitationCover.jsx";
import InvitationContent from "./ui/InvitationContent.jsx";
import ThemeToggle from "./ui/layout/ThemeToggle.jsx";

function App() {
  const invitation = useInvitation();
  return (
    <>
      {invitation.isOpen ? (
        <InvitationContent {...invitation.content} />
      ) : (
        <InvitationCover {...invitation.cover} />
      )}
      <ThemeToggle {...invitation.theme} />
    </>
  );
}

export default App;
