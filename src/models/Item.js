import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['lost', 'found'], required: true },
  location: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);


