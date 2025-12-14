import Inventory from '../models/Inventory.mjs';
import IRepository from './IRepository.mjs';

class InventoryRepository extends IRepository {
  async getByUser(id) {
    return await Inventory.findOne({ user: id }).populate({
      path: 'cards.card'
    });
  }

  async create(data) {
    return await Inventory.create(data);
  }

  async update(id, data) {
    return await Inventory.findByIdAndUpdate(id, data, { new: true });
  }
}

export default new InventoryRepository();
