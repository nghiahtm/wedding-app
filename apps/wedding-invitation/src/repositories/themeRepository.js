// Giao diện màu của thiệp: xanh sage (mặc định) và cam. Lựa chọn được nhớ trong trình duyệt.
const STORAGE_KEY = "wedding-theme";

export const themes = [
  { id: "green", label: "xanh" },
  { id: "orange", label: "cam" },
];

export function loadTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return themes.some((theme) => theme.id === saved) ? saved : themes[0].id;
  } catch {
    return themes[0].id;
  }
}

export function saveTheme(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Trình duyệt chặn lưu trữ: bỏ qua, vẫn đổi màu trong phiên này.
  }
}
