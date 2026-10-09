import StatusPill from '../shared/StatusPill.jsx';

const columns = ['Tên khách mời', 'Số điện thoại', 'Trạng thái', 'Số khách', 'Lời nhắn', 'Thời gian'];

// Bảng hồi đáp; trên điện thoại mỗi dòng hiển thị thành thẻ (nhãn lấy từ data-label).
function GuestTable({ rsvps, loading, totalRsvps }) {
  const emptyText = totalRsvps === 0 ? 'Chưa có hồi đáp nào.' : 'Không có hồi đáp phù hợp.';
  return (
    <div className="table-wrap">
      <table className="guest-table">
        <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>
          {loading || rsvps.length === 0 ? (
            <tr><td colSpan={columns.length} className="empty-state">{loading ? 'Đang tải hồi đáp...' : emptyText}</td></tr>
          ) : rsvps.map((rsvp) => (
            <tr key={rsvp.id}>
              <td className="guest-name">
                <span className="guest-name-inner">
                  <span className="guest-avatar">{rsvp.name.trim().charAt(0).toUpperCase()}</span>
                  <strong>{rsvp.name}</strong>
                </span>
              </td>
              <td data-label="Số điện thoại">{rsvp.phone || '—'}</td>
              <td data-label="Trạng thái"><StatusPill attendance={rsvp.attendance} /></td>
              <td data-label="Số khách">{rsvp.attendance === 'attending' ? rsvp.guests : '—'}</td>
              <td data-label="Lời nhắn" className="note-cell" title={rsvp.note || undefined}>{rsvp.note || '—'}</td>
              <td data-label="Thời gian">{rsvp.createdAtLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestTable;
