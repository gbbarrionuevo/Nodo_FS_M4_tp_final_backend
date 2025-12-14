import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 90,
    unique: true,
    required: true
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 90,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Permission', PermissionSchema);