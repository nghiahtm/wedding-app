import { useCallback, useEffect, useState } from "react";
import { loadTheme, saveTheme, themes } from "../repositories/themeRepository.js";

// Màu đang chọn, gắn vào <html data-theme> để CSS đổi bảng màu; bấm để chuyển qua lại giữa các màu.
export function useTheme() {
  const [themeId, setThemeId] = useState(loadTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = themeId;
    saveTheme(themeId);
  }, [themeId]);

  const toggle = useCallback(() => {
    setThemeId((current) => {
      const index = themes.findIndex((theme) => theme.id === current);
      return themes[(index + 1) % themes.length].id;
    });
  }, []);

  const next = themes.find((theme) => theme.id !== themeId) ?? themes[0];
  return { themeId, nextLabel: next.label, toggle };
}
