import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    minlength: 3,
    maxlength: 90,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 90,
    required: true
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 90,
    unique: true,
    required: true
  },
  first_name: {
    type: String,
    minlength: 3,
    maxlength: 90,
    required: true
  },
  last_name: {
    type: String,
    minlength: 3,
    maxlength: 90,
    required: true
  },
  direccion: {
    type: String,
    maxlength: 255
  },
  avatar: {
    type: String,
    maxlength: 255
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    }
  ],
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);