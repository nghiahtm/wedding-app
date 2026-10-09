import { useEffect, useState } from 'react';
import { ACCEPTED_MUSIC_TYPES, deleteMusic, getMusic, MAX_MUSIC_BYTES, uploadMusic } from '../repositories/musicRepository.js';

function titleFromFileName(name) {
  return name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim() || 'Nhạc nền';
}

export function useMusicManager() {
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMusic()
      .then(setMusic)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function run(task) {
    setBusy(true);
    setMessage('');
    try {
      await task();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  function selectMusic(file) {
    return run(async () => {
      if (file.size > MAX_MUSIC_BYTES) throw new Error('File nhạc quá lớn, tối đa 15MB.');
      setMusic(await uploadMusic(file, titleFromFileName(file.name)));
    });
  }

  function removeMusic() {
    if (!window.confirm('Xóa nhạc nền khỏi thiệp?')) return Promise.resolve();
    return run(async () => {
      await deleteMusic();
      setMusic(null);
    });
  }

  return { music, loading, busy, message, accept: ACCEPTED_MUSIC_TYPES, selectMusic, removeMusic };
}
