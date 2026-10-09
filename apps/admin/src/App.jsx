import { useAdminDashboard } from './app/useAdminDashboard.js';
import AdminDashboard from './ui/AdminDashboard.jsx';

function App() {
  const dashboard = useAdminDashboard();
  return <AdminDashboard {...dashboard} />;
}

export default App;