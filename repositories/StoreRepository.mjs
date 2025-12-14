import Card from '../models/Card.mjs';
import IRepository from './IRepository.mjs';

class StoreRepository extends IRepository {
  async getAll() {
    return await Card.find().sort({ name: 1 });
  }
}

export default new StoreRepository();