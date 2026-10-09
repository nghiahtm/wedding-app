import { postRsvp } from '../api/rsvps.js';
import { createRsvpModel, createRsvpPayload } from '../models/Rsvp.js';

export async function submitRsvp(form) {
  const data = await postRsvp(createRsvpPayload(form));
  return createRsvpModel(data);
}