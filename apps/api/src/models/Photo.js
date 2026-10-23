import mongoose from 'mongoose';

export const PHOTO_CATEGORIES = ['cover', 'couple', 'invitation', 'qr'];
export const PHOTO_SIDES = ['groom', 'bride'];
export const PHOTO_CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_COUPLE_PHOTOS = 10;

const photoSchema = new mongoose.Schema(
  {
    category: { type: String, enum: PHOTO_CATEGORIES, required: true },
    side: { type: String, enum: [...PHOTO_SIDES, null], default: null },
    contentType: { type: String, enum: PHOTO_CONTENT_TYPES, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true, select: false }
  },
  { timestamps: true }
);

photoSchema.index({ category: 1, side: 1, createdAt: 1 });

export default mongoose.model('Photo', photoSchema);
