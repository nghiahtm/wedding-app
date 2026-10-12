// Lưới lịch một tháng, tuần bắt đầu từ thứ Hai: các ô trống đầu tháng là null.
export function buildMonthCells(year, month) {
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
}
