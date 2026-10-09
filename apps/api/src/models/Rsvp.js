import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 12 },
    attendance: { type: String, enum: ['attending', 'declined'], required: true },
    guests: { type: Number, min: 1, max: 10, default: 1 },
    note: { type: String, trim: true, maxlength: 500, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Rsvp', rsvpSchema);