import Permission from '../models/Permission.mjs';
import IRepository from './IRepository.mjs';

class PermissionRepository extends IRepository {
  async getAll() {
    return await Permission.find().sort({ name: 1 });
  }

  async getById(id) {
    return await Permission.findById(id);
  }

  async getOne(data) {
    return await Permission.findOne(data);
  }

  async create(data) {
    return await Permission.create(data);
  }

  async update(id, data) {
    return await Permission.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(data) {
    return await data.deleteOne();
  }
}

export default new PermissionRepository();