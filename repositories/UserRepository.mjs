import User from '../models/User.mjs';
import IRepository from './IRepository.mjs';

class UserRepository extends IRepository {
  async getAll() {
    return await User.find().populate({
      path: 'roles',
      populate: {
        path: 'permissions'
      }
    }).sort({ user_name: 1 });
  }

  async getById(id) {
    return await User.findById(id).populate({
      path: 'roles',
      populate: {
        path: 'permissions'
      }
    });
  }

  async getOne(data) {
    return await User.findOne({ ...data, deletedAt: null }).populate({
      path: "roles",
      populate: {
        path: "permissions"
      }
    });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true })
      .populate({
        path: 'roles',
        populate: {
          path: 'permissions'
        }
      });
  }

  async delete(data) {
    if (data.deletedAt) {
      return data;
    }

    data.deletedAt = new Date();
    return await data.save();
  }

  async restore(data) {
    if (!data.deletedAt) {
      return data;
    }

    data.deletedAt = null;
    return await data.save();
  }
}

export default new UserRepository();