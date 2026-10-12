const timeParts = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Ho_Chi_Minh' });

const dayKey = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' });

// Ngày gửi dạng YYYY-MM-DD theo giờ Việt Nam, để lọc theo ngày.
function toDayKey(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : dayKey.format(date);
}

// Định dạng dd/mm/yy hh:mm theo giờ Việt Nam.
function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const part = Object.fromEntries(timeParts.formatToParts(date).map(({ type, value: text }) => [type, text]));
  return `${part.day}/${part.month}/${part.year} ${part.hour}:${part.minute}`;
}

export function createRsvpModel(data = {}) {
  return {
    id: data._id ?? data.id ?? '',
    name: String(data.name ?? ''),
    phone: String(data.phone ?? ''),
    attendance: data.attendance === 'declined' ? 'declined' : 'attending',
    guests: Number(data.guests ?? 1),
    note: String(data.note ?? ''),
    createdAt: data.createdAt ?? null,
    createdAtLabel: formatTime(data.createdAt),
    createdDate: toDayKey(data.createdAt)
  };
}