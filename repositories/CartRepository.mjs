import Cart from '../models/Cart.mjs';
import IRepository from './IRepository.mjs';

class CartRepository extends IRepository {
  async getAll() {
    return await Cart.find().sort({ createdAt: 1 });
  }

  async getById(id) {
    return await Cart.findById(id);
  }

  async getByUser(id) {
    return await Cart.findOne({ user: id })
      .populate({
        path: "cards.card",
        model: "Card"
      });
  }

  async getOne(data) {
    return await Cart.findOne(data);
  }

  async create(data) {
    return await Cart.create(data);
  }

  async update(id, data) {
    return await Cart.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(data) {
    return await data.deleteOne();
  }
}

export default new CartRepository();