import { useEffect, useState } from 'react';
import { emptyGifts } from '../models/Gifts.js';
import { getGifts, MAX_GIFT_FIELD, saveGifts } from '../repositories/weddingInfoRepository.js';

const trimGift = (gift) => ({ bank: gift.bank.trim(), account: gift.account.trim(), holder: gift.holder.trim() });
const trimGifts = (gifts) => ({ groom: trimGift(gifts.groom), bride: trimGift(gifts.bride) });

// Form tài khoản nhận mừng cưới hai bên (hiện dưới mã QR trên thiệp): tải từ API, theo dõi thay đổi chưa lưu, lưu lại.
export function useGiftForm() {
  const [form, setForm] = useState(emptyGifts);
  const [saved, setSaved] = useState(emptyGifts);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    getGifts()
      .then((gifts) => {
        setForm(gifts);
        setSaved(gifts);
      })
      .catch((error) => setMessage({ type: 'error', text: error.message }))
      .finally(() => setLoading(false));
  }, []);

  function updateField(side, field, value) {
    setForm((current) => ({ ...current, [side]: { ...current[side], [field]: value } }));
    setMessage({ type: '', text: '' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const next = trimGifts(form);
    const tooLong = Object.values(next).some((gift) => Object.values(gift).some((value) => value.length > MAX_GIFT_FIELD));
    if (tooLong) {
      setMessage({ type: 'error', text: `Mỗi ô tối đa ${MAX_GIFT_FIELD} ký tự.` });
      return;
    }
    setSaving(true);
    try {
      const gifts = await saveGifts(next);
      setForm(gifts);
      setSaved(gifts);
      setMessage({ type: 'success', text: 'Đã lưu. Thiệp sẽ hiển thị tài khoản mới khi khách tải lại trang.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  }

  const isDirty = JSON.stringify(trimGifts(form)) !== JSON.stringify(trimGifts(saved));
  return { form, loading, saving, isDirty, message, maxLength: MAX_GIFT_FIELD, updateField, handleSubmit };
}
