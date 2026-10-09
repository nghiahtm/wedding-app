import { Music, VolumeX } from "lucide-react";

// Nút nổi bật/tắt nhạc nền; ẩn khi chưa có nhạc.
function MusicToggle({ music }) {
  if (!music.hasMusic) return null;
  const { isPlaying, toggle } = music;
  const Icon = isPlaying ? Music : VolumeX;

  return (
    <button
      type="button"
      className={`music-toggle${isPlaying ? " is-playing" : ""}`}
      onClick={toggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
    >
      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

export default MusicToggle;
