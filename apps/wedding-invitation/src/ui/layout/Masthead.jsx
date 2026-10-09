import { useEffect, useRef } from "react";
import Monogram from "../shared/Monogram.jsx";

// Header dính đầu trang: chữ lồng, điều hướng tới từng mục và ngày cưới.
// Trên điện thoại, hàng điều hướng cuộn ngang và tự đưa mục đang xem vào giữa.
function Masthead({ weddingDetails, sections, activeSection, onNavigate }) {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector('[aria-current="true"]');
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const left = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
    nav.scrollTo({ left, behavior: "smooth" });
  }, [activeSection]);

  return (
    <header className="masthead">
      <a
        className="monogram"
        href="#home"
        aria-label={`${weddingDetails.groomName} và ${weddingDetails.brideName}`}
      >
        <Monogram initials={weddingDetails.initials} />
      </a>
      <nav className="masthead-nav" aria-label="Điều hướng chính" ref={navRef}>
        {sections.map((section) => (
          <a
            href={`#${section.id}`}
            key={section.id}
            aria-current={section.id === activeSection ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(section.id);
            }}
          >
            {section.label}
          </a>
        ))}
      </nav>
      <span className="date-label">{weddingDetails.dateShort}</span>
    </header>
  );
}

export default Masthead;
