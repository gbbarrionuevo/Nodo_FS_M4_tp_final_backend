import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cards: [
    {
      card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      subtotal: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);