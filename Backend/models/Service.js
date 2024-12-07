import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  imagePublicId: { type: String },
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
