// Tiêu đề dùng chung cho các mục: dòng chữ nhỏ, tiêu đề thư pháp và họa tiết trái tim.
// align: "center" (mặc định) hoặc "start".
function SectionTitle({ eyebrow, children, align = "center" }) {
  return (
    <header className={`section-title is-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
      <svg className="title-ornament" viewBox="0 0 120 14" aria-hidden="true">
        <path d="M2 7h44M74 7h44" />
        <path className="title-ornament-heart" d="M60 12.5c-4.6-3.2-7-5.6-7-8.2 0-1.9 1.4-3.3 3.2-3.3 1.6 0 2.9.9 3.8 2.3.9-1.4 2.2-2.3 3.8-2.3 1.8 0 3.2 1.4 3.2 3.3 0 2.6-2.4 5-7 8.2z" />
      </svg>
    </header>
  );
}

export default SectionTitle;
