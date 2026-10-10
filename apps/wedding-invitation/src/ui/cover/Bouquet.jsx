// Bó hoa mẫu đơn rượu vang và kem, cành quả mọng, lá xanh xám; vẽ bằng SVG để cài vào phong bì.
const LEAVES = [
  { x: 84, y: 262, r: -62, s: 1.15, c: "#8f9a76" },
  { x: 96, y: 268, r: 58, s: 1.1, c: "#a3ad8a" },
  { x: 70, y: 232, r: -88, s: 1, c: "#7f8b67" },
  { x: 128, y: 205, r: 74, s: 1, c: "#8f9a76" },
  { x: 54, y: 120, r: -38, s: .9, c: "#c9a98a" },
  { x: 44, y: 98, r: -58, s: .85, c: "#d8bd9f" },
  { x: 34, y: 142, r: -78, s: .9, c: "#c9a98a" },
];
const BERRIES = [[52, 30], [60, 44], [46, 52], [56, 66], [43, 78], [53, 90], [40, 100]];
// [tâm x, tâm y, cỡ, màu, loại]: loại "big" có nhụy vàng, "small" chỉ vài cánh.
const FLOWERS = [
  [112, 138, 66, "#f1e2c8", "big"],
  [62, 160, 72, "#8d1f33", "big"],
  [36, 214, 38, "#fbf6ee", "small"],
  [88, 214, 78, "#7a1629", "big"],
  [134, 236, 42, "#f1e2c8", "small"],
  [112, 266, 30, "#e7a9ae", "small"],
];

function Bouquet({ className }) {
  return (
    <svg className={className} viewBox="0 0 170 300" aria-hidden="true">
      <defs>
        <linearGradient id="petal-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".38" />
        </linearGradient>
        <symbol id="peony" viewBox="-30 -30 60 60">
          <g stroke="#00000033" strokeWidth=".5">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <g key={a} transform={`rotate(${a})`}>
                <ellipse cy="-15" rx="11" ry="13" fill="currentColor" />
                <ellipse cy="-15" rx="11" ry="13" fill="url(#petal-shade)" />
              </g>
            ))}
            {[20, 80, 140, 200, 260, 320].map((a) => (
              <g key={a} transform={`rotate(${a})`}>
                <ellipse cy="-9" rx="8" ry="10" fill="currentColor" />
                <ellipse cy="-9" rx="8" ry="10" fill="url(#petal-shade)" />
              </g>
            ))}
            {[0, 100, 200, 300].map((a) => (
              <ellipse key={a} cy="-4" rx="5" ry="6" fill="currentColor" transform={`rotate(${a})`} />
            ))}
          </g>
          <circle r="4" fill="#00000030" />
          {[[0, -2], [2, 1], [-2, 1.5], [1, -4], [-3, -2]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="1.1" fill="#e2bd7a" />
          ))}
        </symbol>
        <symbol id="leaf" viewBox="-6 -22 12 24">
          <path d="M0 0C-8 -8 -6 -18 0 -22C6 -18 8 -8 0 0Z" fill="currentColor" />
          <path d="M0 -2V-19" stroke="#ffffff55" strokeWidth=".7" />
        </symbol>
      </defs>
      <g fill="none" strokeLinecap="round">
        <path d="M84 292C70 220 46 130 40 20" stroke="#6f4a3a" strokeWidth="1.6" />
        <path d="M80 290C76 240 96 190 118 140" stroke="#7f8b67" strokeWidth="2.4" />
        <path d="M82 292C60 240 52 200 62 160" stroke="#7f8b67" strokeWidth="2.4" />
      </g>
      {BERRIES.map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4.2" fill="#6e1424" stroke="#ffffff30" strokeWidth=".6" />
      ))}
      {LEAVES.map((l) => (
        <use key={`${l.x}${l.y}`} href="#leaf" x={l.x - 7 * l.s} y={l.y - 24 * l.s} width={14 * l.s} height={28 * l.s} color={l.c} transform={`rotate(${l.r} ${l.x} ${l.y})`} />
      ))}
      {FLOWERS.map(([x, y, s, color]) => (
        <use key={`${x}${y}`} href="#peony" x={x - s / 2} y={y - s / 2} width={s} height={s} color={color} />
      ))}
    </svg>
  );
}

export default Bouquet;
