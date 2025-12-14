import Card from '../models/Card.mjs';
import IRepository from './IRepository.mjs';

class CardRepository extends IRepository {
  async getAll() {
    return await Card.find().sort({ name: 1 });
  }

  async getById(id) {
    return await Card.findById(id);
  }

  async getOne(data) {
    return await Card.findOne(data);
  }

  async create(data) {
    return await Card.create(data);
  }

  async update(id, data) {
    return await Card.findByIdAndUpdate(id, data, { new: true });
  }

  async updateQuantity(id, amount) {
    const abs = Math.abs(amount);

    const updated = await Card.findOneAndUpdate(
      { _id: id, quantity: { $gte: abs } },
      { $inc: { quantity: amount } },
      { new: true }
    );

    if (!updated) {
      throw new Error('Stock insuficiente o carta inexistente');
    }

    return updated;
  }

  async delete(data) {
    return await data.deleteOne();
  }
}

export default new CardRepository();