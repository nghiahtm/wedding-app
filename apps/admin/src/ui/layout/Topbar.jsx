import { ExternalLink, Heart } from 'lucide-react';

const invitationUrl = import.meta.env.VITE_INVITATION_URL ?? 'http://localhost:5173';

// Thanh trên cùng: đường dẫn theo tab hiện tại và nút mở thiệp.
function Topbar({ currentTab }) {
  return (
    <header className="topbar">
      <div className="topbar-crumbs">
        <span className="topbar-brand" aria-hidden="true"><Heart size={14} strokeWidth={2} fill="currentColor" /></span>
        <span className="crumb">Thiệp cưới</span>
        <span className="crumb-sep" aria-hidden="true">/</span>
        <strong>{currentTab.label}</strong>
      </div>
      <a className="preview-link" href={invitationUrl} target="_blank" rel="noreferrer">
        <span>Xem thiệp</span>
        <ExternalLink size={14} strokeWidth={1.9} aria-hidden="true" />
      </a>
    </header>
  );
}

export default Topbar;
