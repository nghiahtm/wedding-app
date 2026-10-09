import { useEffect, useState } from 'react';
import { submitRsvp } from '../repositories/rsvpRepository.js';

const initialForm = { name: '', phone: '', attendance: 'attending', guests: '1', note: '' };
const weddingLocations = [
  { name: 'Nhà trai', address: '48 Trần Duật, Nam Định, Ninh Bình' },
  { name: 'Nhà gái', address: 'Thôn Đông Văn Thịnh, xã Khánh Thiện, Ninh Bình' }
].map((location) => ({
  ...location,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`
}));

const weddingDetails = {
  groomName: 'Minh Nghĩa',
  brideName: 'Đinh Hường',
  dateShort: '29 · 11 · 2026',
  dateLong: 'Chủ Nhật, ngày 29 tháng 11 năm 2026',
  locations: weddingLocations
};

export function useInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isScrollRevealEnabled, setIsScrollRevealEnabled] = useState(false);
  const [revealedSections, setRevealedSections] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const sections = [...document.querySelectorAll('[data-scroll-reveal]')];
    if (sections.length === 0) return undefined;
    if (!('IntersectionObserver' in window)) {
      setRevealedSections(sections.map((section) => section.id));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      const visibleIds = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.id);
      if (visibleIds.length === 0) return;

      setRevealedSections((currentSections) => [
        ...currentSections,
        ...visibleIds.filter((sectionId) => !currentSections.includes(sectionId))
      ]);
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => observer.unobserve(entry.target));
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });

    sections.forEach((section) => observer.observe(section));
    setIsScrollRevealEnabled(true);
    return () => observer.disconnect();
  }, [isOpen]);

  function updateField(event) {
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }));
    setFieldErrors((currentErrors) => ({ ...currentErrors, [event.target.name]: '' }));
  }

  function openInvitation() {
    if (isOpen || isOpening) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsOpen(true);
      return;
    }
    setIsOpening(true);
    window.setTimeout(() => setIsOpen(true), 720);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = {};
    const name = form.name.trim();
    const phone = form.phone.trim();
    const guests = form.guests.trim();

    if (!name) errors.name = 'Vui lòng nhập họ và tên.';
    else if (name.length > 100) errors.name = 'Họ và tên không được vượt quá 100 ký tự.';
    if (!phone) errors.phone = 'Vui lòng nhập số điện thoại.';
    else if (phone.length > 12) errors.phone = 'Số điện thoại không được vượt quá 12 ký tự.';
    if (form.attendance === 'attending') {
      if (!guests) errors.guests = 'Vui lòng nhập số khách.';
      else if (!/^\d+$/.test(guests)) errors.guests = 'Số khách chỉ được gồm chữ số.';
      else if (Number(guests) > 10) errors.guests = 'Số khách không được vượt quá 10.';
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setMessage('');
    try {
      await submitRsvp(form);
      setMessage('Cảm ơn bạn đã gửi lời hồi đáp. Hẹn gặp bạn trong ngày vui!');
      setForm(initialForm);
    } catch (error) {
      const apiErrors = Object.fromEntries((error.errors ?? [])
        .filter(({ field }) => ['name', 'phone', 'guests'].includes(field))
        .map(({ field, message: errorMessage }) => [field, errorMessage]));
      setFieldErrors(apiErrors);
      setMessage(error.message || 'Chưa thể kết nối máy chủ. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  }

  return {
    isOpen,
    isOpening,
    isScrollRevealEnabled,
    revealedSections,
    onOpen: openInvitation,
    form,
    fieldErrors,
    message,
    submitting,
    updateField,
    handleSubmit,
    weddingDetails
  };
}