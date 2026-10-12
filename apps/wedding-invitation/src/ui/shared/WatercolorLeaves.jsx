// Vài chiếc lá màu nước mờ làm họa tiết nền (xem hero.css).
const LEAVES = [
  { d: "M60 330C20 260 24 120 70 20C116 120 112 260 60 330Z", rotate: -4, x: 0, y: 0 },
  { d: "M60 330C20 260 24 120 70 20C116 120 112 260 60 330Z", rotate: 22, x: 90, y: 150 },
  { d: "M60 330C20 260 24 120 70 20C116 120 112 260 60 330Z", rotate: -30, x: -20, y: 330 },
];

function WatercolorLeaves({ className }) {
  return (
    <svg className={className} viewBox="0 0 280 700" aria-hidden="true">
      {LEAVES.map((leaf) => (
        <g key={`${leaf.x}${leaf.y}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate} 60 330)`}>
          <path d={leaf.d} fill="#cdd9c4" fillOpacity=".55" stroke="#b1bda6" strokeWidth="1.2" />
          <path d="M60 330C62 240 66 130 70 20" fill="none" stroke="#b1bda6" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

export default WatercolorLeaves;
