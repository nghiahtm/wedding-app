import { useInvitation } from './app/useInvitation.js';
import InvitationPage from './ui/InvitationPage.jsx';

function App() {
  const invitation = useInvitation();
  return <InvitationPage {...invitation} />;
}

export default App;