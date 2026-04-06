import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  enrollmentNumber: { type: String },
  role: { type: String, enum: ['student', 'faculty'], default: 'student' },
  department: { type: String },
  phone: { type: String },
  username: { type: String, unique: true, sparse: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema);


