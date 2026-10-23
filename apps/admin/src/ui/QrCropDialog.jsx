import { useEffect, useRef, useState } from 'react';

const MIN_SIZE = 40;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Hộp cắt ảnh QR: kéo khung vuông sát mã QR (kéo góc để đổi cỡ), bấm "Cắt và tải lên".
function QrCropDialog({ url, onConfirm, onCancel }) {
  const imageRef = useRef(null);
  const [box, setBox] = useState(null);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  function initBox() {
    const { clientWidth: w, clientHeight: h } = imageRef.current;
    const size = Math.min(w, h) * 0.8;
    setBox({ x: (w - size) / 2, y: (h - size) / 2, size });
  }

  // mode "move" kéo cả khung, "resize" kéo góc dưới phải; cả hai giữ khung vuông và nằm trong ảnh.
  function startDrag(mode) {
    return (event) => {
      event.preventDefault();
      event.stopPropagation();
      const { clientWidth: w, clientHeight: h } = imageRef.current;
      const start = { px: event.clientX, py: event.clientY, ...box };
      const move = (e) => {
        const dx = e.clientX - start.px;
        const dy = e.clientY - start.py;
        if (mode === 'move') {
          setBox({ ...start, x: clamp(start.x + dx, 0, w - start.size), y: clamp(start.y + dy, 0, h - start.size) });
        } else {
          const size = clamp(start.size + Math.max(dx, dy), MIN_SIZE, Math.min(w - start.x, h - start.y));
          setBox({ ...start, size });
        }
      };
      const end = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', end);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', end);
    };
  }

  function confirm() {
    const image = imageRef.current;
    const scale = image.naturalWidth / image.clientWidth;
    onConfirm({ x: box.x * scale, y: box.y * scale, size: box.size * scale });
  }

  return (
    <div className="crop-backdrop" role="dialog" aria-modal="true" aria-label="Cắt ảnh QR">
      <div className="crop-dialog">
        <h3>Cắt sát mã QR</h3>
        <p>Kéo khung vuông cho vừa khít mã QR, bỏ phần tên và số tài khoản. Kéo góc để đổi cỡ.</p>
        <div className="crop-stage">
          <img ref={imageRef} src={url} alt="Ảnh QR cần cắt" onLoad={initBox} draggable={false} />
          {box && (
            <div className="crop-box" style={{ left: box.x, top: box.y, width: box.size, height: box.size }} onPointerDown={startDrag('move')}>
              <span className="crop-handle" onPointerDown={startDrag('resize')} />
            </div>
          )}
        </div>
        <div className="crop-actions">
          <button type="button" className="photo-button" onClick={onCancel}>Hủy</button>
          <button type="button" className="primary-button" disabled={!box} onClick={confirm}>Cắt và tải lên</button>
        </div>
      </div>
    </div>
  );
}

export default QrCropDialog;
