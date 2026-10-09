import mongoose from 'mongoose';

export const MAX_PARENT_NAME = 80;
const parentName = { type: String, trim: true, maxlength: [MAX_PARENT_NAME, `Tên không được vượt quá ${MAX_PARENT_NAME} ký tự.`], default: '' };
const familySchema = new mongoose.Schema({ father: parentName, mother: parentName }, { _id: false });

// Thông tin chung của thiệp, chỉ có một document (key = "main").
const weddingInfoSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'main' },
    families: {
      groom: { type: familySchema, default: () => ({}) },
      bride: { type: familySchema, default: () => ({}) }
    }
  },
  { timestamps: true }
);

export default mongoose.model('WeddingInfo', weddingInfoSchema);
