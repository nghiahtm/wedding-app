import { getPetals } from "../../repositories/petalRepository.js";

// Cánh hoa rơi nhẹ phủ toàn màn hình (xem petals.css); không chặn thao tác chạm.
function PetalFall() {
  return (
    <span className="petal-fall" aria-hidden="true">
      {getPetals().map((petal, index) => (
        <span
          key={index}
          className={`petal petal-tone-${petal.tone}`}
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.3,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            "--petal-sway": petal.sway,
          }}
        />
      ))}
    </span>
  );
}

export default PetalFall;
