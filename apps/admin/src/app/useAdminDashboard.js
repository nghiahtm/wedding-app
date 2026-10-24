import { useCallback, useEffect, useState } from 'react';
import { clearRsvpNote, listRsvps } from '../repositories/rsvpRepository.js';
import { getVisitStats } from '../repositories/visitRepository.js';
import { getWedding } from '../repositories/weddingRepository.js';
import { filterRsvps } from './guestFilters.js';

const { date: weddingDate, ...weddingInfo } = getWedding();

const RECENT_LIMIT = 5;

function getDaysUntilWedding() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((weddingDate - today) / 86400000));
}

export function useAdminDashboard() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [visitStats, setVisitStats] = useState(null);

  // Tải (hoặc làm mới) danh sách hồi đáp và số liệu lượt xem.
  const reload = useCallback(() => {
    setLoading(true);
    setError('');
    listRsvps()
      .then(setRsvps)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
    getVisitStats()
      .then(setVisitStats)
      .catch(() => setVisitStats(null));
  }, []);

  useEffect(reload, [reload]);

  // Xóa lời chúc của một khách (giữ nguyên thông tin tham dự); hỏi lại trước khi xóa.
  async function clearNote(rsvp) {
    if (!window.confirm(`Xóa lời chúc của ${rsvp.name}? Lời chúc cũng sẽ biến mất khỏi thiệp.`)) return;
    try {
      await clearRsvpNote(rsvp.id);
      setRsvps((current) => current.map((item) => (item.id === rsvp.id ? { ...item, note: '' } : item)));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  const attending = rsvps.filter((rsvp) => rsvp.attendance === 'attending');
  const visibleRsvps = filterRsvps(rsvps, { filter, search, dateFrom, dateTo });

  return {
    rsvps: visibleRsvps,
    recentRsvps: rsvps.slice(0, RECENT_LIMIT),
    totalRsvps: rsvps.length,
    filter,
    search,
    dateFrom,
    dateTo,
    loading,
    error,
    summary: {
      attending: attending.length,
      guests: attending.reduce((total, rsvp) => total + rsvp.guests, 0),
      declined: rsvps.length - attending.length
    },
    visitStats,
    wedding: { ...weddingInfo, daysUntilWedding: getDaysUntilWedding() },
    onFilterChange: setFilter,
    onSearchChange: setSearch,
    onDateFromChange: setDateFrom,
    onDateToChange: setDateTo,
    onRefresh: reload,
    onClearNote: clearNote
  };
}
