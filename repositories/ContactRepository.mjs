import Contact from '../models/Contact.mjs';
import IRepository from './IRepository.mjs';

class ContactRepository extends IRepository {
  async getAll() {
    return await Contact.find().populate({
      path: 'user'
    }).sort({ createdAt: 1 });
  }

  async getById(id) {
    return await Contact.findById(id).populate({
      path: 'user'
    });
  }

  async getOne(data) {
    return await Contact.findOne(data);
  }

  async create(data) {
    return await Contact.create(data);
  }

  async delete(data) {
    return await data.deleteOne();
  }
}

export default new ContactRepository();