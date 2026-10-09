const wedding = {
  groomName: 'Minh Nghĩa',
  brideName: 'Đinh Hường',
  date: new Date(2026, 10, 29),
  dateLabel: 'CHỦ NHẬT · 29 THÁNG 11, 2026',
  dateShort: '29 · 11 · 2026'
};

export function getWedding() {
  return { ...wedding, date: new Date(wedding.date) };
}
