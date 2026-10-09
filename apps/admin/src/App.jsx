import { useAdminDashboard } from './app/useAdminDashboard.js';
import { useAdminNavigation } from './app/useAdminNavigation.js';
import { useFamilyForm } from './app/useFamilyForm.js';
import { useMusicManager } from './app/useMusicManager.js';
import { usePhotoManager } from './app/usePhotoManager.js';
import AdminDashboard from './ui/AdminDashboard.jsx';

function App() {
  const dashboard = useAdminDashboard();
  const navigation = useAdminNavigation();
  const photoManager = usePhotoManager();
  const musicManager = useMusicManager();
  const familyForm = useFamilyForm();
  return <AdminDashboard dashboard={dashboard} navigation={navigation} photoManager={photoManager} musicManager={musicManager} familyForm={familyForm} />;
}

export default App;