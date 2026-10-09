import { useEffect, useState } from 'react';
import { getTabs } from '../repositories/navigationRepository.js';

const tabs = getTabs();
const tabIds = tabs.map((tab) => tab.id);

function tabFromHash() {
  const id = window.location.hash.slice(1);
  return tabIds.includes(id) ? id : tabs[0].id;
}

// Tab đang chọn, đồng bộ với #hash trên địa chỉ để tải lại trang hoặc bấm Back vẫn đúng tab.
export function useAdminNavigation() {
  const [activeTab, setActiveTab] = useState(tabFromHash);

  useEffect(() => {
    const sync = () => setActiveTab(tabFromHash());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  function selectTab(id) {
    if (!tabIds.includes(id)) return;
    if (id !== activeTab) window.history.pushState(null, '', `#${id}`);
    setActiveTab(id);
    window.scrollTo({ top: 0 });
  }

  return {
    tabs,
    activeTab,
    currentTab: tabs.find((tab) => tab.id === activeTab),
    selectTab
  };
}
