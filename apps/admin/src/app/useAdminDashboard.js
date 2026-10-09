import { useEffect, useState } from 'react';
import { listRsvps } from '../repositories/rsvpRepository.js';

const weddingDate = new Date(2026, 10, 29);

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

  useEffect(() => {
    listRsvps()
      .then(setRsvps)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const attending = rsvps.filter((rsvp) => rsvp.attendance === 'attending');
  const visibleRsvps = filter === 'all' ? rsvps : rsvps.filter((rsvp) => rsvp.attendance === filter);

  return {
    rsvps: visibleRsvps,
    totalRsvps: rsvps.length,
    filter,
    loading,
    error,
    summary: {
      attending: attending.length,
      guests: attending.reduce((total, rsvp) => total + rsvp.guests, 0),
      declined: rsvps.length - attending.length
    },
    wedding: {
      groomName: 'Minh Nghĩa',
      brideName: 'Đinh Huòng',
      dateLabel: 'CHỦ NHẬT · 29 THÁNG 11, 2026',
      dateShort: '29 · 11 · 2026',
      daysUntilWedding: getDaysUntilWedding()
    },
    onFilterChange: setFilter
  };
}