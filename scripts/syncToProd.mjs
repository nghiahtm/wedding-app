// Đồng bộ dữ liệu từ API local (admin 5174) lên server production (admin 5175): ảnh, thông tin thiệp, nhạc nền.
// Không chép RSVP/lời chúc của khách. Dùng: node scripts/syncToProd.mjs [--dry-run]
import { readFileSync } from 'node:fs';

const SOURCE = process.env.SYNC_SOURCE ?? 'http://localhost:4000';
const DRY_RUN = process.argv.includes('--dry-run');

function readEnvFile(path) {
  return Object.fromEntries(readFileSync(path, 'utf8').split(/\r?\n/)
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => [line.slice(0, line.indexOf('=')).trim(), line.slice(line.indexOf('=') + 1).trim()]));
}

const prodEnv = readEnvFile(new URL('../.env.prod', import.meta.url));
const TARGET = prodEnv.ADMIN_API_TARGET;
const KEY = prodEnv.ADMIN_API_KEY;
if (!TARGET || !KEY) throw new Error('.env.prod thiếu ADMIN_API_TARGET hoặc ADMIN_API_KEY.');

async function call(base, path, { method = 'GET', body, headers = {} } = {}) {
  const response = await fetch(`${base}${path}`, { method, body, headers: { 'X-Admin-Key': KEY, ...headers } });
  if (!response.ok) throw new Error(`${method} ${base}${path} -> ${response.status} ${await response.text()}`);
  return response;
}

const json = async (base, path, options) => (await (await call(base, path, options)).json()).data;
const download = async (path) => Buffer.from(await (await call(SOURCE, path)).arrayBuffer());

async function syncPhotos() {
  const source = await json(SOURCE, '/api/photos');
  const oldIds = (await json(TARGET, '/api/photos')).map((photo) => photo.id);
  console.log(`Ảnh: local ${source.length}, server hiện có ${oldIds.length}.`);
  if (DRY_RUN) return;
  // Tải ảnh mới lên trước, xong mới xóa ảnh cũ trên server để không bao giờ bị trống giữa chừng.
  for (const photo of source) {
    const query = new URLSearchParams({ category: photo.category, ...(photo.side ? { side: photo.side } : {}) });
    const uploaded = await json(TARGET, `/api/photos?${query}`, { method: 'POST', body: await download(photo.url), headers: { 'Content-Type': 'application/octet-stream' } });
    console.log(`  + ${photo.category}${photo.side ? `/${photo.side}` : ''} -> ${uploaded.id}`);
  }
  const remaining = new Set((await json(TARGET, '/api/photos')).map((photo) => photo.id));
  for (const id of oldIds.filter((oldId) => remaining.has(oldId))) await call(TARGET, `/api/photos/${id}`, { method: 'DELETE' });
}

async function syncInfo() {
  const info = await json(SOURCE, '/api/wedding');
  console.log('Thông tin thiệp: bố mẹ + tài khoản mừng cưới.');
  if (!DRY_RUN) await call(TARGET, '/api/wedding', { method: 'PUT', body: JSON.stringify(info), headers: { 'Content-Type': 'application/json' } });
}

async function syncMusic() {
  const music = await json(SOURCE, '/api/music');
  if (!music) return console.log('Nhạc: local chưa có, bỏ qua.');
  console.log(`Nhạc: "${music.title}" (${music.size} byte).`);
  if (!DRY_RUN) await call(TARGET, `/api/music?title=${encodeURIComponent(music.title)}`, { method: 'PUT', body: await download(music.url), headers: { 'Content-Type': 'application/octet-stream' } });
}

console.log(`${DRY_RUN ? '[Chạy thử] ' : ''}${SOURCE}  ->  ${TARGET}`);
await syncPhotos();
await syncInfo();
await syncMusic();
console.log(DRY_RUN ? 'Xong chạy thử, chưa ghi gì lên server.' : 'Đã đồng bộ xong.');
