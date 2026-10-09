import mongoose from 'mongoose';

export const MUSIC_CONTENT_TYPES = ['audio/mpeg', 'audio/mp4', 'audio/ogg', 'audio/wav'];
// Một document MongoDB tối đa 16MB nên giới hạn file nhạc ở 15MB.
export const MAX_MUSIC_BYTES = 15 * 1024 * 1024;

const musicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    contentType: { type: String, enum: MUSIC_CONTENT_TYPES, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true, select: false }
  },
  { timestamps: true }
);

export default mongoose.model('Music', musicSchema);
