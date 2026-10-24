import { useEffect, useRef, useState } from "react";

// Phát nhạc nền lặp lại, tự phát ngay khi vào trang (hoặc ở lần chạm đầu tiên nếu trình duyệt chặn); tạm dừng khi khách chuyển tab và phát tiếp khi quay lại.
export function useBackgroundMusic(music) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const resumeOnVisibleRef = useRef(false);

  useEffect(() => {
    if (!music) return undefined;
    const audio = new Audio(music.url);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.7;
    const syncPlaying = () => setIsPlaying(!audio.paused);
    audio.addEventListener("play", syncPlaying);
    audio.addEventListener("pause", syncPlaying);
    audioRef.current = audio;

    function handleVisibility() {
      if (document.hidden) {
        resumeOnVisibleRef.current = !audio.paused;
        audio.pause();
      } else if (resumeOnVisibleRef.current) {
        audio.play().catch(() => {});
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    // Thử phát ngay khi vào trang. Trình duyệt chặn phát có tiếng khi khách chưa chạm vào trang,
    // nên nếu bị chặn thì phát ở lần chạm / bấm phím đầu tiên.
    const gestures = ["pointerdown", "touchend", "keydown"];
    const stopWaiting = () => gestures.forEach((name) => window.removeEventListener(name, startOnGesture));
    function startOnGesture() {
      stopWaiting();
      if (audio.paused) audio.play().catch(() => {});
    }
    audio.play().catch(() => gestures.forEach((name) => window.addEventListener(name, startOnGesture, { once: true, passive: true })));

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      stopWaiting();
      audio.pause();
      audioRef.current = null;
    };
  }, [music]);

  // Phải gọi trong sự kiện bấm của khách thì trình duyệt mới cho phát có tiếng.
  function play() {
    audioRef.current?.play().catch(() => {});
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else audio.pause();
  }

  return { hasMusic: Boolean(music), isPlaying, play, toggle };
}
