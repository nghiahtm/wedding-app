import { MapPin } from "lucide-react";
import WatercolorLeaves from "../shared/WatercolorLeaves.jsx";
import DinnerInfo from "./DinnerInfo.jsx";

// Mỗi cụm trong địa chỉ (cách nhau dấu phẩy) một dòng, để địa chỉ hai bên luôn có số dòng bằng nhau và không bị ngắt giữa cụm.
const addressLines = (text) => text.split(", ").map((part, index, parts) => (index < parts.length - 1 ? `${part},` : part));

function parentsTitle(family) {
  if (family.father && family.mother) return "Ông Bà";
  return family.father ? "Ông" : "Bà";
}

function FamilyColumn({ family }) {
  const hasParents = family.father || family.mother;
  return (
    <article className="info-family">
      <div className="info-parents">
        {hasParents ? (
          <>
            <small>{parentsTitle(family)}</small>
            {family.father && <strong>{family.father}</strong>}
            {family.mother && <strong>{family.mother}</strong>}
          </>
        ) : (
          <p className="info-pending">Đang cập nhật</p>
        )}
      </div>
      {family.address && (
        <a className="info-address" href={family.mapUrl} target="_blank" rel="noreferrer" aria-label={`Mở bản đồ: ${family.address}`}>
          <MapPin size={12} strokeWidth={1.8} aria-hidden="true" />
          <span>
            {addressLines(family.address).map((line) => (
              <span className="info-address-line" key={line}>
                {line}
              </span>
            ))}
          </span>
        </a>
      )}
    </article>
  );
}

function Person({ family }) {
  return <h3 className="info-person">{family.childName}</h3>;
}

// Thông tin lễ cưới (theo mẫu): bố mẹ hai bên, lời báo tin, tên chú rể / cô dâu, nơi và giờ làm lễ, ngày cưới.
// Nơi và giờ làm lễ để trống ở weddingRepository thì ẩn các dòng đó.
function WeddingInfo({ families, weddingDetails }) {
  if (families.length === 0) return null;
  const [groomFamily, brideFamily] = families;
  const { event } = weddingDetails;
  const { place, time } = event.ceremony;

  return (
    <div className="info-wrap">
      <WatercolorLeaves className="info-leaves" />
      <img className="info-flower" src="/images/flower2-decoration.webp" alt="" aria-hidden="true" />
      <div className="info-paper">
        <h2 className="info-title">Thiệp cưới</h2>
        <div className="info-families">
          <FamilyColumn family={groomFamily} />
          <FamilyColumn family={brideFamily} />
        </div>
        <p className="info-announce">
          <span className="info-announce-lead">Thư Mời</span>
          <br />
          tham dự lễ thành hôn của chúng mình
        </p>
        <Person family={groomFamily} />
        <span className="info-amp" aria-hidden="true">&</span>
        <Person family={brideFamily} />
        {place && (
          <p className="info-ceremony">
            Lễ thành hôn được cử hành tại
            <strong>{place}</strong>
          </p>
        )}
        {time && (
          <p className="info-ceremony">
            Vào lúc
            <strong className="info-ceremony-time">{time}</strong>
          </p>
        )}
        <div className="event-day">
          <span>{event.weekday}</span>
          <strong>{event.day}</strong>
          <span>{event.month}</span>
        </div>
        <p className="event-year">{event.year}</p>
        <p className="event-lunar">{event.lunar}</p>
        <div className="dinners">
          <DinnerInfo family={groomFamily} />
          <DinnerInfo family={brideFamily} />
        </div>
      </div>
    </div>
  );
}

export default WeddingInfo;
