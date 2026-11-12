import { Palette } from "lucide-react";

// Nút nổi đổi màu thiệp giữa xanh và cam (nằm trên nút nhạc).
function ThemeToggle({ nextLabel, toggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Đổi sang màu ${nextLabel}`}
      title={`Đổi sang màu ${nextLabel}`}
    >
      <Palette size={18} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
