import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
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
  payment: {
    type: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true
    },
    expirationDate: {
      type: String,
      required: true
    },
    securityCode: {
      type: String,
      required: true
    },
    holderName: {
      type: String,
      required: true
    },
    holderLastName: {
      type: String,
      required: true
    },
    installments: {
      type: Number,
      default: 1
    },
    subtotal: {
      type: Number,
      required: true
    },
    interests: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('Purchase', PurchaseSchema);