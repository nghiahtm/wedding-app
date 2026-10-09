const weekdayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const HEART_PATH =
  "M32 56C14 42 4 32 4 19 4 10 11 4 19 4c6 0 10 3 13 8 3-5 7-8 13-8 8 0 15 6 15 15 0 13-10 23-28 37z";

// Lịch tháng cưới, ngày cưới được khoanh bằng trái tim.
function WeddingCalendar({ year, month, day }) {
  const leadingBlanks = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <div
      className="wedding-calendar"
      role="img"
      aria-label={`Lịch tháng ${month} năm ${year}, ngày cưới ${day} được khoanh trái tim`}
    >
      <p className="calendar-title" aria-hidden="true">
        Tháng {month} <span>·</span> {year}
      </p>
      <div className="calendar-grid" aria-hidden="true">
        {weekdayLabels.map((label) => (
          <span className="calendar-weekday" key={label}>
            {label}
          </span>
        ))}
        {cells.map((date, index) => (
          <span
            className={`calendar-day${date === day ? " is-wedding-day" : ""}`}
            key={date ?? `blank-${index}`}
          >
            {date === day && (
              <svg className="calendar-heart" viewBox="0 0 64 60">
                <path d={HEART_PATH} pathLength="1" />
              </svg>
            )}
            <span>{date}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default WeddingCalendar;
