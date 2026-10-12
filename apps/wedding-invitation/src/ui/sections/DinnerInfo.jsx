import { MapPin } from "lucide-react";

// Bữa cơm thân mật của một bên: giờ, ngày, nơi và liên kết chỉ đường (mở Google Maps của bên đó).
function DinnerInfo({ family }) {
  const { dinner, mapUrl } = family;
  if (!dinner) return null;
  // Tên bữa cơm tách thành "Bữa cơm thân mật" và "Nhà trai" để điện thoại xuống dòng đúng chỗ.
  const [titleMain, titleSide] = dinner.title.split(" - ");

  return (
    <article className="dinner">
      <h3 className="dinner-title">
        <span className="dinner-title-main">{titleMain}</span>
        {titleSide && (
          <>
            <span className="dinner-title-sep"> - </span>
            <span className="dinner-title-side">{titleSide}</span>
          </>
        )}
      </h3>
      <p className="dinner-details">
        <span>
          {dinner.time} - {dinner.weekday}
        </span>
        <span>{dinner.date}</span>
        <span>{dinner.place}</span>
      </p>
      {mapUrl && (
        <a className="dinner-route" href={mapUrl} target="_blank" rel="noreferrer">
          <MapPin size={22} strokeWidth={1.4} aria-hidden="true" />
          <span>Chỉ đường</span>
        </a>
      )}
    </article>
  );
}

export default DinnerInfo;
