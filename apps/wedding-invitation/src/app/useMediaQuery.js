import { useEffect, useState } from "react";

// Dưới 768px coi là điện thoại; iPad và máy tính từ 768px trở lên.
export const MOBILE_QUERY = "(max-width: 767px)";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const sync = () => setMatches(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
