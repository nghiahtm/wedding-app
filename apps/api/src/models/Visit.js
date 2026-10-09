import mongoose from 'mongoose';

// Mỗi document là một lượt ghé thăm. visitorId là mã ẩn danh do trình duyệt của khách tự tạo; không lưu IP.
const visitSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, trim: true, match: /^[A-Za-z0-9-]{8,64}$/ }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

visitSchema.index({ visitorId: 1, createdAt: -1 });
visitSchema.index({ createdAt: -1 });

export default mongoose.model('Visit', visitSchema);
