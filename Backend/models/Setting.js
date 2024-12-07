import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // Unique identifier for the setting
  value: { type: mongoose.Schema.Types.Mixed, required: true }, // Dynamic data type for any value
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);
