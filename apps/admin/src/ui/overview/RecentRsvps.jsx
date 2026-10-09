import { ArrowRight } from 'lucide-react';
import StatusPill from '../shared/StatusPill.jsx';

// 5 hồi đáp mới nhất, kèm nút sang tab Khách mời.
function RecentRsvps({ rsvps, loading, onViewAll }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div><h2>Hồi đáp gần đây</h2><p>5 lời hồi đáp mới nhất từ khách mời</p></div>
        <button type="button" className="text-button" onClick={onViewAll}>
          Xem tất cả <ArrowRight size={14} strokeWidth={1.9} aria-hidden="true" />
        </button>
      </div>
      {loading ? <p className="empty-state">Đang tải hồi đáp...</p> : rsvps.length === 0 ? (
        <p className="empty-state">Chưa có hồi đáp nào.</p>
      ) : (
        <ul className="recent-list">
          {rsvps.map((rsvp) => (
            <li className="recent-item" key={rsvp.id}>
              <span className="guest-avatar">{rsvp.name.trim().charAt(0).toUpperCase()}</span>
              <div className="recent-main">
                <p><strong>{rsvp.name}</strong><time>{rsvp.createdAtLabel}</time></p>
                <p className="recent-note">{rsvp.note || 'Không để lại lời nhắn'}</p>
              </div>
              <StatusPill attendance={rsvp.attendance} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecentRsvps;
