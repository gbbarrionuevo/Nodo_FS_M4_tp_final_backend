import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
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
      }
    }
  ]

}, { timestamps: true });

export default mongoose.model('Inventory', InventorySchema);
