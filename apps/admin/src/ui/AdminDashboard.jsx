const invitationUrl = import.meta.env.VITE_INVITATION_URL ?? 'http://localhost:5173';

function AdminDashboard({ rsvps, totalRsvps, filter, loading, error, summary, wedding, onFilterChange }) {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview"><span className="brand-mark">W</span><span>Wedding<br />Studio</span></a>
        <p className="nav-caption">TỔNG QUAN</p>
        <a className="nav-item active" href="#overview"><span>▦</span> Bảng điều khiển</a>
        <a className="nav-item" href="#guests"><span>♡</span> Khách mời</a>
        <div className="sidebar-bottom"><span className="avatar">MN</span><span><strong>{wedding.groomName}</strong><small>Chủ thiệp</small></span><span className="more">···</span></div>
      </aside>

      <main className="workspace" id="overview">
        <header className="topbar"><div><span className="crumb">Thiệp cưới</span><span className="crumb-sep">/</span><strong>Tổng quan</strong></div><a className="preview-link" href={invitationUrl} target="_blank" rel="noreferrer">Xem thiệp <span>↗</span></a></header>
        <section className="page-heading"><div><p className="eyebrow">{wedding.dateLabel}</p><h1>Xin chào, {wedding.groomName}</h1><p>Theo dõi những hồi đáp cho ngày vui của bạn.</p></div><span className="date-button">♡ <span>Còn {wedding.daysUntilWedding} ngày</span></span></section>

        <section className="stats" aria-label="Thống kê hồi đáp">
          <article className="stat"><span className="stat-icon sage">↗</span><span className="stat-label">Đã xác nhận tham dự</span><strong>{loading ? '—' : summary.attending}</strong><small>lời hồi đáp</small></article>
          <article className="stat"><span className="stat-icon coral">♧</span><span className="stat-label">Tổng khách dự kiến</span><strong>{loading ? '—' : summary.guests}</strong><small>khách mời</small></article>
          <article className="stat"><span className="stat-icon gold">✉</span><span className="stat-label">Chưa thể tham dự</span><strong>{loading ? '—' : summary.declined}</strong><small>lời hồi đáp</small></article>
        </section>

        <section className="guest-section" id="guests">
          <div className="section-heading"><div><h2>Hồi đáp gần đây</h2><p>Cập nhật từ khách mời của bạn</p></div><label className="filter-control"><span className="visually-hidden">Lọc hồi đáp</span><select className="filter-button" value={filter} onChange={(event) => onFilterChange(event.target.value)}><option value="all">Tất cả hồi đáp</option><option value="attending">Sẽ tham dự</option><option value="declined">Không tham dự</option></select></label></div>
          {error && <p className="notice" role="status">{error} Hãy kiểm tra backend và MongoDB.</p>}
          <div className="table-wrap"><table><thead><tr><th>TÊN KHÁCH MỜI</th><th>SỐ ĐIỆN THOẠI</th><th>TRẠNG THÁI</th><th>SỐ KHÁCH</th><th>LỜI NHẮN</th><th>THỜI GIAN</th></tr></thead><tbody>
            {loading ? <tr><td colSpan="6" className="empty-state">Đang tải hồi đáp...</td></tr> : rsvps.length === 0 ? <tr><td colSpan="6" className="empty-state">{totalRsvps === 0 ? 'Chưa có hồi đáp nào.' : 'Không có hồi đáp phù hợp.'}</td></tr> : rsvps.map((rsvp) => <tr key={rsvp.id}><td><span className="guest-avatar">{rsvp.name.trim().charAt(0).toUpperCase()}</span><strong>{rsvp.name}</strong></td><td>{rsvp.phone || '—'}</td><td><span className={`status ${rsvp.attendance}`}>{rsvp.attendance === 'attending' ? 'Sẽ tham dự' : 'Không tham dự'}</span></td><td>{rsvp.attendance === 'attending' ? rsvp.guests : '—'}</td><td className="note-cell">{rsvp.note || '—'}</td><td>{new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' }).format(new Date(rsvp.createdAt))}</td></tr>)}
          </tbody></table></div>
        </section>
        <footer className="admin-footer">Thiệp cưới {wedding.groomName} & {wedding.brideName} <span>{wedding.dateShort}</span></footer>
      </main>
    </div>
  );
}

export default AdminDashboard;