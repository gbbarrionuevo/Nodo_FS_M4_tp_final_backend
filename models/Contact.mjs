import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Contact', ContactSchema);