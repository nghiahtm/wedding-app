// Bỏ dấu tiếng Việt để tìm "huong" vẫn ra "Hường".
function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
}

// Lọc hồi đáp theo trạng thái, từ khóa và khoảng ngày gửi (YYYY-MM-DD, giờ Việt Nam; bỏ trống = không giới hạn).
export function filterRsvps(rsvps, { filter, search, dateFrom, dateTo }) {
  const query = normalize(search);
  return rsvps
    .filter((rsvp) => filter === 'all' || rsvp.attendance === filter)
    .filter((rsvp) => !query || [rsvp.name, rsvp.phone, rsvp.note].some((field) => normalize(field).includes(query)))
    .filter((rsvp) => !dateFrom || (rsvp.createdDate && rsvp.createdDate >= dateFrom))
    .filter((rsvp) => !dateTo || (rsvp.createdDate && rsvp.createdDate <= dateTo));
}
