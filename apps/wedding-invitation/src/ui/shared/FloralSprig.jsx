// Cụm hoa hồng phấn với lá xanh xám và nhánh vàng hồng, dùng trang trí khung ảnh.
function FloralSprig({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 70" aria-hidden="true">
      <path d="M60 40C78 26 92 22 112 30" stroke="#c9a08f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M60 40C42 26 28 22 8 30" stroke="#c9a08f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="112" cy="30" r="2" fill="#c9a08f" />
      <circle cx="8" cy="30" r="2" fill="#c9a08f" />
      <path d="M60 42C40 32 26 34 12 46C30 50 46 50 60 42Z" fill="#a9b28d" />
      <path d="M60 42C80 32 94 34 108 46C90 50 74 50 60 42Z" fill="#a9b28d" />
      <path d="M50 48C42 58 32 62 24 62C30 54 40 49 50 48Z" fill="#c4c9a3" />
      <path d="M70 48C78 58 88 62 96 62C90 54 80 49 70 48Z" fill="#c4c9a3" />
      <circle cx="43" cy="44" r="8" fill="#efc9c3" />
      <circle cx="43" cy="44" r="4.5" fill="#e3aaa4" />
      <circle cx="77" cy="44" r="8" fill="#efc9c3" />
      <circle cx="77" cy="44" r="4.5" fill="#e3aaa4" />
      <circle cx="60" cy="38" r="13" fill="#ebbcb6" />
      <circle cx="60" cy="38" r="9" fill="#dc9d97" />
      <path d="M55 38a5 5 0 1 1 5 5a3 3 0 1 1-3-3" stroke="#b0646a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <ellipse cx="30" cy="38" rx="3" ry="4.5" fill="#dc9d97" transform="rotate(-30 30 38)" />
      <ellipse cx="90" cy="38" rx="3" ry="4.5" fill="#dc9d97" transform="rotate(30 90 38)" />
    </svg>
  );
}

export default FloralSprig;
