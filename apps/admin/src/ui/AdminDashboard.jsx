import { Heart } from 'lucide-react';
import GuestsTab from './guests/GuestsTab.jsx';
import InfoTab from './info/InfoTab.jsx';
import MobileTabBar from './layout/MobileTabBar.jsx';
import PageHeading from './layout/PageHeading.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Topbar from './layout/Topbar.jsx';
import MusicManager from './MusicManager.jsx';
import OverviewTab from './overview/OverviewTab.jsx';
import PhotoManager from './PhotoManager.jsx';

// Khung trang quản trị: thanh bên (máy tính) / thanh tab đáy (điện thoại) và nội dung theo tab.
function AdminDashboard({ dashboard, navigation, photoManager, musicManager, familyForm, giftForm }) {
  const { wedding } = dashboard;
  const { tabs, activeTab, currentTab, selectTab } = navigation;
  const isOverview = activeTab === 'overview';

  return (
    <div className="admin-shell">
      <Sidebar tabs={tabs} activeTab={activeTab} onSelectTab={selectTab} guestCount={dashboard.totalRsvps} wedding={wedding} />
      <main className="workspace">
        <Topbar currentTab={currentTab} />
        <PageHeading
          eyebrow={isOverview ? wedding.dateLabel : null}
          title={isOverview ? `Xin chào, ${wedding.groomName}` : currentTab.label}
          description={currentTab.description}
          aside={isOverview && (
            <span className="countdown">
              <Heart size={14} strokeWidth={2} fill="currentColor" aria-hidden="true" />
              Còn <strong>{wedding.daysUntilWedding}</strong> ngày
            </span>
          )}
        />
        {activeTab === 'overview' && (
          <OverviewTab {...dashboard} onViewAllGuests={() => selectTab('guests')} />
        )}
        {activeTab === 'info' && <InfoTab familyForm={familyForm} giftForm={giftForm} wedding={wedding} />}
        {activeTab === 'guests' && <GuestsTab {...dashboard} />}
        {activeTab === 'photos' && <div className="tab-content"><PhotoManager {...photoManager} /></div>}
        {activeTab === 'music' && <div className="tab-content"><MusicManager {...musicManager} /></div>}
        <footer className="admin-footer">
          Thiệp cưới {wedding.groomName} & {wedding.brideName} <span>{wedding.dateShort}</span>
        </footer>
      </main>
      <MobileTabBar tabs={tabs} activeTab={activeTab} onSelectTab={selectTab} />
    </div>
  );
}

export default AdminDashboard;
