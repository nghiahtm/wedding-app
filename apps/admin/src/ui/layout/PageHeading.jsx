// Tiêu đề của từng tab; aside là phần phụ bên phải (ví dụ đếm ngược ngày cưới).
function PageHeading({ eyebrow, title, description, aside }) {
  return (
    <section className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {aside}
    </section>
  );
}

export default PageHeading;
