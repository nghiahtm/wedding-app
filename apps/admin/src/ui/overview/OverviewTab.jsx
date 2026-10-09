import RecentRsvps from './RecentRsvps.jsx';
import StatsGrid from './StatsGrid.jsx';

function OverviewTab({ loading, error, summary, visitStats, recentRsvps, onViewAllGuests }) {
  return (
    <div className="tab-content">
      {error && <p className="notice" role="status">{error} Hãy kiểm tra backend và MongoDB.</p>}
      <StatsGrid loading={loading} summary={summary} visitStats={visitStats} />
      <RecentRsvps rsvps={recentRsvps} loading={loading} onViewAll={onViewAllGuests} />
    </div>
  );
}

export default OverviewTab;
