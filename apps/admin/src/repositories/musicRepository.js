import { fetchMusic, putMusic, removeMusic } from '../api/music.js';
import { createMusicModel } from '../models/Music.js';

// Khớp với giới hạn MAX_MUSIC_BYTES của API.
export const MAX_MUSIC_BYTES = 15 * 1024 * 1024;
export const ACCEPTED_MUSIC_TYPES = '.mp3,.m4a,.ogg,.wav,audio/mpeg,audio/mp4,audio/ogg,audio/wav';

export async function getMusic() {
  return createMusicModel(await fetchMusic());
}

export async function uploadMusic(file, title) {
  return createMusicModel(await putMusic(file, title));
}

export async function deleteMusic() {
  await removeMusic();
}
