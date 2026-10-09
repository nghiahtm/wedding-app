import { useEffect, useState } from 'react';
import { listRsvps } from '../repositories/rsvpRepository.js';
import { getVisitStats } from '../repositories/visitRepository.js';
import { getWedding } from '../repositories/weddingRepository.js';

const { date: weddingDate, ...weddingInfo } = getWedding();

// Bỏ dấu tiếng Việt để tìm "huong" vẫn ra "Hường".
function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
}

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
  const [visitStats, setVisitStats] = useState(null);

  useEffect(() => {
    listRsvps()
      .then(setRsvps)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
    getVisitStats()
      .then(setVisitStats)
      .catch(() => setVisitStats(null));
  }, []);

  const attending = rsvps.filter((rsvp) => rsvp.attendance === 'attending');
  const query = normalize(search);
  const visibleRsvps = rsvps
    .filter((rsvp) => filter === 'all' || rsvp.attendance === filter)
    .filter((rsvp) => !query || [rsvp.name, rsvp.phone, rsvp.note].some((field) => normalize(field).includes(query)));

  return {
    rsvps: visibleRsvps,
    recentRsvps: rsvps.slice(0, RECENT_LIMIT),
    totalRsvps: rsvps.length,
    filter,
    search,
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
    onSearchChange: setSearch
  };
}