import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
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
  },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
      required: true
    }
  ]
}, { timestamps: true });

export default mongoose.model('Role', RoleSchema);