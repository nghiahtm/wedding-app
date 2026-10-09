export function createRsvpModel(data = {}) {
  return {
    id: data._id ?? data.id ?? null,
    name: String(data.name ?? ''),
    phone: String(data.phone ?? ''),
    attendance: data.attendance === 'declined' ? 'declined' : 'attending',
    guests: Number(data.guests ?? 1),
    note: String(data.note ?? ''),
    createdAt: data.createdAt ?? null
  };
}

export function createRsvpPayload(form) {
  const guestCount = Number(form.guests);
  return {
    name: form.name.trim(),
    phone: form.phone.trim(),
    attendance: form.attendance,
    guests: Number.isSafeInteger(guestCount) && guestCount > 0 ? guestCount : 1,
    note: form.note.trim()
  };
}