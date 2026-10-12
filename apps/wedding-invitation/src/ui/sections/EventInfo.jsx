import WatercolorLeaves from "../shared/WatercolorLeaves.jsx";
import WeddingCalendar from "./WeddingCalendar.jsx";

// Thông tin tiệc cưới: giờ, ngày (thứ | ngày | tháng), năm, âm lịch, lịch tháng, thêm vào lịch và nút xác nhận tham dự.
// Giờ để trống ở weddingRepository thì ẩn các dòng giờ.
function EventInfo({ weddingDetails, onNavigate }) {
  const { event, date, calendarUrl } = weddingDetails;

  return (
    <div className="event-wrap">
      <WatercolorLeaves className="event-leaves" />
      <img className="event-flower" src="/images/flower2-decoration.webp" alt="" aria-hidden="true" />
      <div className="event-paper">
        <h2 className="event-title">Thông tin tiệc cưới</h2>
        <p className="event-lead">{event.time ? "Tiệc cưới sẽ diễn ra vào lúc:" : "Tiệc cưới sẽ diễn ra vào ngày:"}</p>
        {event.time && <p className="event-time">{event.time}</p>}
        <div className="event-day">
          <span>{event.weekday}</span>
          <strong>{event.day}</strong>
          <span>{event.month}</span>
        </div>
        <p className="event-year">{event.year}</p>
        <p className="event-lunar">{event.lunar}</p>
        {event.time && (
          <p className="event-start">
            <small>Khai tiệc</small>
            {event.time}
          </p>
        )}
        <WeddingCalendar {...date} />
        <a className="event-calendar-link" href={calendarUrl} target="_blank" rel="noreferrer">
          Thêm vào lịch
        </a>
        <button type="button" className="event-confirm" onClick={() => onNavigate("rsvp")}>
          Xác nhận tham dự
        </button>
      </div>
    </div>
  );
}

export default EventInfo;
