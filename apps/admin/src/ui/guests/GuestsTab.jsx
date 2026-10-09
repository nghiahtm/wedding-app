import { Search } from 'lucide-react';
import GuestTable from './GuestTable.jsx';

// Tab Khách mời: tìm kiếm, lọc theo trạng thái và bảng hồi đáp.
function GuestsTab({ rsvps, totalRsvps, loading, error, filter, search, onFilterChange, onSearchChange }) {
  return (
    <div className="tab-content">
      <section className="panel">
        <div className="panel-heading guests-toolbar">
          <label className="search-field">
            <Search size={15} strokeWidth={1.9} aria-hidden="true" />
            <span className="visually-hidden">Tìm khách mời</span>
            <input type="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Tìm theo tên, số điện thoại, lời nhắn..." />
          </label>
          <label className="select-field">
            <span className="visually-hidden">Lọc hồi đáp</span>
            <select value={filter} onChange={(event) => onFilterChange(event.target.value)}>
              <option value="all">Tất cả hồi đáp</option>
              <option value="attending">Sẽ tham dự</option>
              <option value="declined">Không tham dự</option>
            </select>
          </label>
          <span className="result-count" role="status">{loading ? '' : `${rsvps.length}/${totalRsvps} hồi đáp`}</span>
        </div>
        {error && <p className="notice" role="status">{error} Hãy kiểm tra backend và MongoDB.</p>}
        <GuestTable rsvps={rsvps} loading={loading} totalRsvps={totalRsvps} />
      </section>
    </div>
  );
}

export default GuestsTab;
