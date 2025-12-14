import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    unique: true,
    required: true
  },
  localId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: String,
  illustrator: String,
  rarity: String,
  set: {
    id: String,
    name: String
  },
  hp: Number,
  types: [String],
  stage: String,
  attacks: [{
    cost: [String],
    name: String,
    effect: String,
    damage: String
  }],
  weaknesses: [{
    type: { type: String, default: null },
    value: { type: String, default: null }
  }],
  resistances: [{
    type: { type: String, default: null },
    value: { type: String, default: null }
  }],
  abilities: [{
    name: { type: String, default: null },
    effect: { type: String, default: null },
    type: { type: String, default: null }
  }],
  price: {
    type: Number,
    default: null
  },
  quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Card', CardSchema);