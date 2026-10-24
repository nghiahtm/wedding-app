import { fetchRsvps, removeRsvpNote } from '../api/rsvps.js';
import { createRsvpModel } from '../models/Rsvp.js';

export async function listRsvps() {
  const records = await fetchRsvps();
  return records.map(createRsvpModel);
}

export async function clearRsvpNote(id) {
  await removeRsvpNote(id);
}
