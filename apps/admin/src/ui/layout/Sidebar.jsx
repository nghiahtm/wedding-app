import { Heart } from 'lucide-react';
import { tabIcons } from './tabIcons.js';

// Thanh bên trên máy tính: thương hiệu, các tab và chủ thiệp.
function Sidebar({ tabs, activeTab, onSelectTab, guestCount, wedding }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" onClick={(event) => { event.preventDefault(); onSelectTab('overview'); }}>
        <span className="brand-mark"><Heart size={16} strokeWidth={2} fill="currentColor" aria-hidden="true" /></span>
        <span>Wedding<br />Studio</span>
      </a>
      <p className="nav-caption">Quản lý thiệp</p>
      <nav className="nav-list" aria-label="Điều hướng quản trị">
        {tabs.map((tab) => {
          const Icon = tabIcons[tab.id];
          return (
            <a
              className="nav-item"
              href={`#${tab.id}`}
              key={tab.id}
              aria-current={tab.id === activeTab ? 'page' : undefined}
              onClick={(event) => { event.preventDefault(); onSelectTab(tab.id); }}
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{tab.label}</span>
              {tab.id === 'guests' && guestCount > 0 && <small className="nav-badge">{guestCount}</small>}
            </a>
          );
        })}
      </nav>
      <div className="sidebar-bottom">
        <span className="avatar">{wedding.groomName.trim().charAt(0)}</span>
        <span><strong>{wedding.groomName}</strong><small>Chủ thiệp</small></span>
      </div>
    </aside>
  );
}

export default Sidebar;
