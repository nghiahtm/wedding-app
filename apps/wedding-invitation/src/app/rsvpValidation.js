export const initialRsvpForm = {
  name: "",
  phone: "",
  attendance: "attending",
  guests: "1",
  note: "",
};

export const RSVP_ERROR_FIELDS = ["name", "phone", "guests", "note"];
export const MAX_NOTE_LENGTH = 300;

// Trả về object lỗi theo từng trường; rỗng nghĩa là hợp lệ.
export function validateRsvp(form) {
  const errors = {};
  const name = form.name.trim();
  const phone = form.phone.trim();
  const guests = form.guests.trim();

  if (!name) errors.name = "Vui lòng nhập họ và tên.";
  else if (name.length > 100)
    errors.name = "Họ và tên không được vượt quá 100 ký tự.";
  // Số điện thoại không bắt buộc; nếu nhập thì không quá 12 ký tự.
  if (phone.length > 12)
    errors.phone = "Số điện thoại không được vượt quá 12 ký tự.";
  if (form.attendance === "attending") {
    if (!guests) errors.guests = "Vui lòng nhập số khách.";
    else if (!/^\d+$/.test(guests))
      errors.guests = "Số khách chỉ được gồm chữ số.";
    else if (Number(guests) > 10)
      errors.guests = "Số khách không được vượt quá 10.";
  }
  if (form.note.trim().length > MAX_NOTE_LENGTH)
    errors.note = `Lời nhắn không được vượt quá ${MAX_NOTE_LENGTH} ký tự.`;
  return errors;
}
