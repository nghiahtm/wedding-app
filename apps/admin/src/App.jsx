import { useAdminDashboard } from './app/useAdminDashboard.js';
import { useAdminNavigation } from './app/useAdminNavigation.js';
import { useFamilyForm } from './app/useFamilyForm.js';
import { useGiftForm } from './app/useGiftForm.js';
import { useMusicManager } from './app/useMusicManager.js';
import { usePhotoManager } from './app/usePhotoManager.js';
import AdminDashboard from './ui/AdminDashboard.jsx';

function App() {
  const dashboard = useAdminDashboard();
  const navigation = useAdminNavigation();
  const photoManager = usePhotoManager();
  const musicManager = useMusicManager();
  const familyForm = useFamilyForm();
  const giftForm = useGiftForm();
  return <AdminDashboard dashboard={dashboard} navigation={navigation} photoManager={photoManager} musicManager={musicManager} familyForm={familyForm} giftForm={giftForm} />;
}

export default App;