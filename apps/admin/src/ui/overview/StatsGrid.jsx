import { CalendarX2, Eye, UserCheck, Users } from 'lucide-react';

function StatCard({ icon: Icon, tone, label, value, unit, note }) {
  return (
    <article className="stat">
      <span className={`stat-icon ${tone}`}><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
      <span className="stat-label">{label}</span>
      <p className="stat-value"><strong>{value}</strong><small>{unit}</small></p>
      {note && <span className="stat-note">{note}</span>}
    </article>
  );
}

// Bốn ô thống kê ở tab Tổng quan.
function StatsGrid({ loading, summary, visitStats }) {
  const show = (value) => (loading ? '—' : value);
  return (
    <section className="stats" aria-label="Thống kê">
      <StatCard icon={UserCheck} tone="sage" label="Đã xác nhận tham dự" value={show(summary.attending)} unit="lời hồi đáp" />
      <StatCard icon={Users} tone="coral" label="Tổng khách dự kiến" value={show(summary.guests)} unit="khách mời" />
      <StatCard icon={CalendarX2} tone="gold" label="Chưa thể tham dự" value={show(summary.declined)} unit="lời hồi đáp" />
      <StatCard
        icon={Eye}
        tone="sky"
        label="Người đã xem thiệp"
        value={visitStats ? visitStats.uniqueVisitors : '—'}
        unit="người"
        note={visitStats && `${visitStats.totalVisits} lượt xem · ${visitStats.todayVisits} hôm nay`}
      />
    </section>
  );
}

export default StatsGrid;
