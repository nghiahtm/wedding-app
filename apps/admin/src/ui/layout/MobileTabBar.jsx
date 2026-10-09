import { tabIcons } from './tabIcons.js';

// Thanh tab cố định ở đáy màn hình điện thoại (thay cho thanh bên).
function MobileTabBar({ tabs, activeTab, onSelectTab }) {
  return (
    <nav className="mobile-tabbar" aria-label="Điều hướng quản trị">
      {tabs.map((tab) => {
        const Icon = tabIcons[tab.id];
        return (
          <a
            className="mobile-tab"
            href={`#${tab.id}`}
            key={tab.id}
            aria-current={tab.id === activeTab ? 'page' : undefined}
            onClick={(event) => { event.preventDefault(); onSelectTab(tab.id); }}
          >
            <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            <span>{tab.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default MobileTabBar;
