import { useEffect, useState } from 'react';
import { emptyFamilies } from '../models/Families.js';
import { getFamilies, MAX_PARENT_NAME, saveFamilies } from '../repositories/weddingInfoRepository.js';

const trimFamilies = (families) => ({
  groom: { father: families.groom.father.trim(), mother: families.groom.mother.trim() },
  bride: { father: families.bride.father.trim(), mother: families.bride.mother.trim() }
});

// Form tên bố mẹ hai bên: tải từ API, theo dõi thay đổi chưa lưu, lưu lại.
export function useFamilyForm() {
  const [form, setForm] = useState(emptyFamilies);
  const [saved, setSaved] = useState(emptyFamilies);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    getFamilies()
      .then((families) => {
        setForm(families);
        setSaved(families);
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
    const next = trimFamilies(form);
    const tooLong = Object.values(next).some((family) => Object.values(family).some((name) => name.length > MAX_PARENT_NAME));
    if (tooLong) {
      setMessage({ type: 'error', text: `Mỗi tên tối đa ${MAX_PARENT_NAME} ký tự.` });
      return;
    }
    setSaving(true);
    try {
      const families = await saveFamilies(next);
      setForm(families);
      setSaved(families);
      setMessage({ type: 'success', text: 'Đã lưu. Thiệp sẽ hiển thị thông tin mới khi khách tải lại trang.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  }

  const isDirty = JSON.stringify(trimFamilies(form)) !== JSON.stringify(trimFamilies(saved));
  return { form, loading, saving, isDirty, message, maxLength: MAX_PARENT_NAME, updateField, handleSubmit };
}
