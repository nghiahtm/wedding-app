// Section có hiệu ứng hiện dần khi cuộn tới; from: "left" hoặc "right".
function RevealSection({ id, className, from, revealed, children }) {
  const isVisible = revealed.includes(id);
  return (
    <section
      className={`${className} section scroll-reveal from-${from}${isVisible ? " is-visible" : ""}`}
      id={id}
      data-scroll-reveal
    >
      {children}
    </section>
  );
}

export default RevealSection;
