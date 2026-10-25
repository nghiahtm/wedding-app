import mongoose from 'mongoose';

export const MAX_NOTE_LENGTH = 300;

const rsvpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, trim: true, maxlength: 12, default: '' },
    attendance: { type: String, enum: ['attending', 'declined'], required: true },
    guests: { type: Number, min: 1, max: 10, default: 1 },
    note: { type: String, trim: true, maxlength: [MAX_NOTE_LENGTH, `Lời nhắn không được vượt quá ${MAX_NOTE_LENGTH} ký tự.`], default: '' }
  },
  { timestamps: true }
);

rsvpSchema.index({ createdAt: -1 });

export default mongoose.model('Rsvp', rsvpSchema);
