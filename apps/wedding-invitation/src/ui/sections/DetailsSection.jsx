import { CalendarHeart, MapPin } from "lucide-react";
import RevealSection from "../shared/RevealSection.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";

function LocationCard({ location }) {
  return (
    <article className="location-card">
      <p className="location-name">
        <MapPin size={15} strokeWidth={1.8} aria-hidden="true" />
        {location.name}
      </p>
      <p className="location-address">{location.address}</p>
      <div className="map-frame">
        <iframe
          src={location.embedUrl}
          title={`Bản đồ ${location.name}: ${location.address}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        className="map-link"
        href={location.mapUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Mở bản đồ ${location.name}`}
      >
        <MapPin size={17} strokeWidth={1.8} aria-hidden="true" />
        <span>Mở bản đồ</span>
      </a>
    </article>
  );
}

function VenueSide({ venue }) {
  return (
    <section className="venue-side" id={venue.anchorId} aria-label={`Địa điểm bên ${venue.label.toLowerCase()}`}>
      <h3 className="venue-side-title">Bên {venue.label.toLowerCase()}</h3>
      {venue.locations.map((location) => (
        <LocationCard location={location} key={location.name} />
      ))}
    </section>
  );
}

// Thời gian & địa điểm: dải ngày cưới, bên dưới chia hai cột bên nhà trai / bên nhà gái.
function DetailsSection({ weddingDetails, revealed }) {
  return (
    <RevealSection id="details" className="details" from="right" revealed={revealed}>
      <SectionTitle eyebrow="Lễ thành hôn">
        Hẹn gặp bạn
        <br />ở ngày vui nhé.
      </SectionTitle>
      <div className="event-date">
        <CalendarHeart size={22} strokeWidth={1.6} aria-hidden="true" />
        <div>
          <strong>{weddingDetails.dateShort}</strong>
          <span>{weddingDetails.dateLong}</span>
        </div>
      </div>
      <div className="venue-sides">
        {weddingDetails.sides.map((venue) => (
          <VenueSide venue={venue} key={venue.side} />
        ))}
      </div>
    </RevealSection>
  );
}

export default DetailsSection;
