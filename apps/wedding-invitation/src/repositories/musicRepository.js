import { fetchMusic } from "../api/music.js";
import { createMusicModel } from "../models/Music.js";

export async function getMusic() {
  return createMusicModel(await fetchMusic());
}
