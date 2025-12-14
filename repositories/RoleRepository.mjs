import Role from '../models/Role.mjs';
import IRepository from './IRepository.mjs';

class RoleRepository extends IRepository {
  async getAll() {
    return await Role.find().populate({
      path: 'permissions'
    }).sort({ name: 1 });
  }

  async getById(id) {
    return await Role.findById(id).populate({
      path: 'permissions'
    });
  }

  async getOne(data) {
    return await Role.findOne(data);
  }

  async create(data) {
    return await Role.create(data);
  }

  async update(id, data) {
    return await Role.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(data) {
    return await data.deleteOne();
  }
}

export default new RoleRepository();