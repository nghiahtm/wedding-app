import { MapPin } from "lucide-react";
import RevealSection from "../shared/RevealSection.jsx";

// Địa điểm: nơi tổ chức tiệc cưới, địa chỉ và một bản đồ.
function DetailsSection({ weddingDetails, revealed }) {
  const { venue } = weddingDetails;

  return (
    <RevealSection id="details" className="details" from="right" revealed={revealed}>
      <div className="venue">
        <h3 className="venue-heading">Tiệc cưới sẽ tổ chức tại</h3>
        <p className="venue-address">{venue.address}</p>
        <div className="map-frame">
          <iframe
            src={venue.embedUrl}
            title={`Bản đồ ${venue.name}: ${venue.address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <a className="map-link" href={venue.mapUrl} target="_blank" rel="noreferrer" aria-label={`Mở bản đồ ${venue.name}`}>
          <MapPin size={17} strokeWidth={1.8} aria-hidden="true" />
          <span>Mở bản đồ</span>
        </a>
      </div>
    </RevealSection>
  );
}

export default DetailsSection;
