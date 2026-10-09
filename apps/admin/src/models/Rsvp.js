export function createRsvpModel(data = {}) {
  return {
    id: data._id ?? data.id ?? '',
    name: String(data.name ?? ''),
    phone: String(data.phone ?? ''),
    attendance: data.attendance === 'declined' ? 'declined' : 'attending',
    guests: Number(data.guests ?? 1),
    note: String(data.note ?? ''),
    createdAt: data.createdAt ?? null
  };
}