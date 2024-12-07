import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  imageUrl: { type: String },
  imagePublicId: { type: String },
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);
