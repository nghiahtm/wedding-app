import FloralSprig from "../shared/FloralSprig.jsx";

// Khung ảnh dạng cửa sổ vòm có rèm; chạm để kéo rèm sang hai bên và lộ ảnh.
function CurtainWindow({ photo, alt, initials, isOpen, onOpen }) {
  return (
    <div className={`curtain-window${isOpen ? " is-open" : ""}`}>
      <FloralSprig className="window-flowers window-flowers-top" />
      <button
        type="button"
        className="window-pane"
        onClick={onOpen}
        disabled={isOpen}
        aria-label={isOpen ? alt : "Chạm để mở rèm xem ảnh cưới"}
      >
        <span className="window-glass">
          {photo ? (
            <img src={photo.url} alt="" />
          ) : (
            <span className="window-monogram" aria-hidden="true">
              {initials.groom}
              <em>&</em>
              {initials.bride}
            </span>
          )}
          <span className="curtain curtain-left" aria-hidden="true">
            <span className="curtain-wave">
              <span className="curtain-fabric" />
            </span>
          </span>
          <span className="curtain curtain-right" aria-hidden="true">
            <span className="curtain-wave">
              <span className="curtain-fabric" />
            </span>
          </span>
          <span className="curtain-valance" aria-hidden="true" />
        </span>
      </button>
      <FloralSprig className="window-flowers window-flowers-left" />
      <FloralSprig className="window-flowers window-flowers-right" />
      <p className="window-hint" aria-hidden={isOpen}>
        Chạm vào cửa sổ để mở rèm
      </p>
    </div>
  );
}

export default CurtainWindow;
