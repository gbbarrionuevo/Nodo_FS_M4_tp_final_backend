import Purchase from '../models/Purchase.mjs';
import IRepository from './IRepository.mjs';

class PurchaseRepository extends IRepository {
  async getByUser(id) {
    return await Purchase.find({ user: id }).populate({
      path: 'cards.card'
    });
  }

  async create(data) {
    return await Purchase.create(data);
  }
}

export default new PurchaseRepository();