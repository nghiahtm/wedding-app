import mongoose from 'mongoose';

export const MAX_PARENT_NAME = 80;
export const MAX_GIFT_FIELD = 80;
const parentName = { type: String, trim: true, maxlength: [MAX_PARENT_NAME, `Tên không được vượt quá ${MAX_PARENT_NAME} ký tự.`], default: '' };
const familySchema = new mongoose.Schema({ father: parentName, mother: parentName }, { _id: false });
const giftField = { type: String, trim: true, maxlength: [MAX_GIFT_FIELD, `Thông tin không được vượt quá ${MAX_GIFT_FIELD} ký tự.`], default: '' };
// Tài khoản nhận mừng cưới đi kèm mã QR: ngân hàng, số tài khoản, chủ tài khoản.
const giftSchema = new mongoose.Schema({ bank: giftField, account: giftField, holder: giftField }, { _id: false });

// Thông tin chung của thiệp, chỉ có một document (key = "main").
const weddingInfoSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'main' },
    families: {
      groom: { type: familySchema, default: () => ({}) },
      bride: { type: familySchema, default: () => ({}) }
    },
    gifts: {
      groom: { type: giftSchema, default: () => ({}) },
      bride: { type: giftSchema, default: () => ({}) }
    }
  },
  { timestamps: true }
);

export default mongoose.model('WeddingInfo', weddingInfoSchema);
