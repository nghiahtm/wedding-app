import { useState } from "react";
import { submitRsvp } from "../repositories/rsvpRepository.js";
import {
  initialRsvpForm,
  MAX_NOTE_LENGTH,
  RSVP_ERROR_FIELDS,
  validateRsvp,
} from "./rsvpValidation.js";

// Thời gian hiệu ứng lá thư gấp lại và bay đi sau khi gửi thành công.
const LETTER_FLIGHT_MS = 2600;

// onSent: gọi sau khi gửi thành công, ví dụ tải lại danh sách lời chúc.
export function useRsvpForm(onSent) {
  const [form, setForm] = useState(initialRsvpForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isLetterFlying, setIsLetterFlying] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validateRsvp(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setMessage("");
    try {
      await submitRsvp(form);
      setForm(initialRsvpForm);
      setFieldErrors({});
      setIsLetterFlying(true);
      window.setTimeout(() => {
        setIsLetterFlying(false);
        setMessage("Cảm ơn bạn đã gửi lời chúc. Hẹn gặp bạn trong ngày vui!");
      }, LETTER_FLIGHT_MS);
      onSent?.();
    } catch (error) {
      const apiErrors = Object.fromEntries(
        (error.errors ?? [])
          .filter(({ field }) => RSVP_ERROR_FIELDS.includes(field))
          .map(({ field, message: errorMessage }) => [field, errorMessage]),
      );
      setFieldErrors(apiErrors);
      setMessage(
        error.message || "Chưa thể kết nối máy chủ. Vui lòng thử lại sau.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return {
    form,
    fieldErrors,
    message,
    submitting,
    isLetterFlying,
    maxNoteLength: MAX_NOTE_LENGTH,
    updateField,
    handleSubmit,
  };
}
