import { Heart, MapPin } from "lucide-react";
import RevealSection from "../shared/RevealSection.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";

function FamilyCard({ family, onNavigate }) {
  const hasParents = family.father || family.mother;
  return (
    <article className="family-card">
      <span className="family-card-border" aria-hidden="true" />
      <p className="family-label">{family.label}</p>
      {hasParents ? (
        <dl className="family-parents">
          {family.father && (
            <div>
              <dt>Ông</dt>
              <dd>{family.father}</dd>
            </div>
          )}
          {family.mother && (
            <div>
              <dt>Bà</dt>
              <dd>{family.mother}</dd>
            </div>
          )}
        </dl>
      ) : (
        <p className="family-pending">Đang cập nhật</p>
      )}
      <p className="family-child">
        <small>{family.childLabel}</small>
        <strong>{family.childName}</strong>
      </p>
      {family.address && (
        <a
          className="family-address"
          href={`#${family.mapAnchorId}`}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(family.mapAnchorId);
          }}
        >
          <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
          <span>{family.address}</span>
          <small>Xem bản đồ</small>
        </a>
      )}
    </article>
  );
}

// Thông tin nhà trai, nhà gái: tên bố mẹ (nhập ở admin), cô dâu / chú rể và địa chỉ nhà.
function FamilySection({ families, revealed, onNavigate }) {
  if (families.length === 0) return null;
  const [groomFamily, brideFamily] = families;

  return (
    <RevealSection id="family" className="family" from="right" revealed={revealed}>
      <SectionTitle eyebrow="Trân trọng báo tin">Gia đình hai bên</SectionTitle>
      <div className="family-grid">
        <FamilyCard family={groomFamily} onNavigate={onNavigate} />
        <span className="family-heart" aria-hidden="true">
          <Heart size={18} strokeWidth={1.8} fill="currentColor" />
        </span>
        <FamilyCard family={brideFamily} onNavigate={onNavigate} />
      </div>
    </RevealSection>
  );
}

export default FamilySection;
