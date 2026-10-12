import { buildMonthCells } from "../../app/calendarMonth.js";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const HEART_PATH = "M12 21C6 16.5 2 13 2 8.2 2 5 4.4 3 7 3c2 0 3.8 1.1 5 3 1.2-1.9 3-3 5-3 2.6 0 5 2 5 5.2 0 4.8-4 8.3-10 12.8z";

// Lịch tháng cưới: ô ngày cưới là trái tim tự vẽ viền, đập nhẹ và lan vòng (xem event-info.css).
function WeddingCalendar({ year, month, day }) {
  const cells = buildMonthCells(year, month);

  return (
    <div className="wedding-calendar" role="img" aria-label={`Lịch tháng ${month} năm ${year}, ngày cưới ${day}`}>
      <p className="calendar-title">
        Tháng {month} / {year}
      </p>
      <div className="calendar-grid">
        {WEEKDAYS.map((label) => (
          <span className="calendar-weekday" key={label}>
            {label}
          </span>
        ))}
        {cells.map((value, index) =>
          value === day ? (
            <span className="calendar-day is-wedding" key={index}>
              <svg className="calendar-heart" viewBox="0 0 24 22" aria-hidden="true">
                <path className="calendar-heart-ring" d={HEART_PATH} pathLength="1" />
                <path className="calendar-heart-fill" d={HEART_PATH} />
                <path className="calendar-heart-line" d={HEART_PATH} pathLength="1" />
              </svg>
              <b>{value}</b>
            </span>
          ) : (
            <span className="calendar-day" key={index}>
              {value}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export default WeddingCalendar;
