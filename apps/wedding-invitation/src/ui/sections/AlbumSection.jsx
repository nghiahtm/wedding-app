import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import RevealSection from "../shared/RevealSection.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";
import { useCarousel } from "../shared/useCarousel.js";

// Album dạng cuộn ngang: ảnh đang xem ở giữa, hai bên lộ ảnh kế tiếp; vuốt, bấm mũi tên hoặc chấm.
function AlbumSection({ couplePhotos, revealed }) {
  const trackRef = useRef(null);
  const count = couplePhotos.length;
  const { activeIndex, goTo, next, prev, interactionProps } = useCarousel(trackRef, count);
  if (count === 0) return null;
  const hasControls = count > 1;

  return (
    <RevealSection id="album" className="album" from="right" revealed={revealed}>
      <SectionTitle>Album ảnh</SectionTitle>
      <div className="album-carousel" {...interactionProps}>
        {hasControls && (
          <button type="button" className="album-arrow is-prev" onClick={prev} aria-label="Ảnh trước">
            <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        )}
        <div className="album-track" ref={trackRef} role="region" aria-label="Album ảnh cưới" tabIndex={0}>
          {couplePhotos.map((photo, index) => (
            <a
              className={`album-slide${index === activeIndex ? " is-active" : ""}`}
              href={photo.url}
              target="_blank"
              rel="noreferrer"
              key={photo.id}
              aria-label={`Xem ảnh cưới ${index + 1} trên ${count}`}
            >
              <img src={photo.url} alt="" loading={index < 3 ? "eager" : "lazy"} />
            </a>
          ))}
        </div>
        {hasControls && (
          <button type="button" className="album-arrow is-next" onClick={next} aria-label="Ảnh tiếp theo">
            <ChevronRight size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        )}
      </div>
      {hasControls && (
        <div className="album-nav">
          <div className="album-dots">
            {couplePhotos.map((photo, index) => (
              <button
                type="button"
                key={photo.id}
                className={`album-dot${index === activeIndex ? " is-active" : ""}`}
                onClick={() => goTo(index)}
                aria-label={`Xem ảnh ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      )}
    </RevealSection>
  );
}

export default AlbumSection;
