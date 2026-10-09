import { useEffect, useState } from 'react';
import { deletePhoto, listPhotos, MAX_COUPLE_PHOTOS, uploadPhoto } from '../repositories/photoRepository.js';
import { prepareImage } from './prepareImage.js';

function findSlot(photos, category, side) {
  return photos.find((photo) => photo.category === category && photo.side === side) ?? null;
}

export function usePhotoManager() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyKeys, setBusyKeys] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    listPhotos()
      .then(setPhotos)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function runBusy(key, task) {
    setBusyKeys((keys) => [...keys, key]);
    setMessage('');
    try {
      await task();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusyKeys((keys) => keys.filter((busyKey) => busyKey !== key));
    }
  }

  const couplePhotos = photos.filter((photo) => photo.category === 'couple');

  function uploadCouplePhotos(fileList) {
    const files = [...fileList];
    const remaining = MAX_COUPLE_PHOTOS - couplePhotos.length;
    return runBusy('couple', async () => {
      if (remaining <= 0) throw new Error(`Đã đủ ${MAX_COUPLE_PHOTOS} ảnh, hãy xóa bớt trước khi thêm.`);
      for (const file of files.slice(0, remaining)) {
        const photo = await uploadPhoto(await prepareImage(file), { category: 'couple' });
        setPhotos((current) => [...current, photo]);
      }
      if (files.length > remaining) throw new Error(`Chỉ tải thêm được ${remaining} ảnh, các ảnh còn lại đã bỏ qua.`);
    });
  }

  function uploadSlotPhoto(category, side, file) {
    return runBusy(`${category}-${side}`, async () => {
      const prepared = await prepareImage(file, { keepOriginal: category === 'qr' });
      const photo = await uploadPhoto(prepared, { category, side });
      setPhotos((current) => [...current.filter((item) => !(item.category === category && item.side === side)), photo]);
    });
  }

  function removePhoto(photo) {
    if (!window.confirm('Xóa ảnh này khỏi thiệp?')) return Promise.resolve();
    return runBusy(photo.id, async () => {
      await deletePhoto(photo.id);
      setPhotos((current) => current.filter((item) => item.id !== photo.id));
    });
  }

  return {
    loading,
    message,
    busyKeys,
    couplePhotos,
    maxCouplePhotos: MAX_COUPLE_PHOTOS,
    slots: {
      invitation: { groom: findSlot(photos, 'invitation', 'groom'), bride: findSlot(photos, 'invitation', 'bride') },
      qr: { groom: findSlot(photos, 'qr', 'groom'), bride: findSlot(photos, 'qr', 'bride') }
    },
    uploadCouplePhotos,
    uploadSlotPhoto,
    removePhoto
  };
}
