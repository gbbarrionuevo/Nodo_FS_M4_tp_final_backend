import userRepository from '../repositories/UserRepository.mjs';
import roleRepository from '../repositories/RoleRepository.mjs';
import bcrypt from 'bcryptjs';
import fs from "fs";

export async function getUserAll() {
  return await userRepository.getAll();
}

export async function getUserById(id) {
  return await userRepository.getById(id);
}

export async function createUser(data) {
  const existUser = await userRepository.getOne({
    $or: [
      { user_name: data.user_name },
      { email: data.email }
    ]
  });

  if (existUser) {
    throw new Error('Usuario o email ya existe');
  }

  delete data.deletedAt;

  if (data.roles && !Array.isArray(data.roles)) {
    data.roles = [data.roles];
  }

  const passwordHashed = await bcrypt.hash(data.password, 10);

  const rolesFound = [];
  for (const r of data.roles) {
    const role = await roleRepository.getOne({ name: r });
    if (!role) {
      throw new Error(`Rol no encontrado: ${r}`);
    }
    rolesFound.push(role._id);
  }

  const user = await userRepository.create({
    ...data,
    password: passwordHashed,
    roles: rolesFound
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
}

export async function updateUser(id, data) {
  const user = await userRepository.getById(id);

  if (!user) {
    return null;
  }

  delete data.deletedAt;

  if (data.roles === undefined) {
    delete data.roles;
  }

  // if (Array.isArray(data.roles) && data.roles.length === 0) {
  //   delete data.roles;
  // }

  if (data.roles && !Array.isArray(data.roles)) {
    data.roles = [data.roles];
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  // if (data.direccion === "") {
  //   delete data.direccion;
  // }

  if (data.avatar === "") {
    delete data.avatar;
  }

  if (data.roles) {
    const rolesFound = [];
    for (const r of data.roles) {
      const role = await roleRepository.getOne({ name: r });
      if (!role) {
        throw new Error(`Rol no encontrado: ${r}`);
      }
      rolesFound.push(role._id);
    }
    data.roles = rolesFound;
  }

  const updated = await userRepository.update(id, data);

  const userResponse = updated.toObject();
  delete userResponse.password;

  return {
    user: userResponse
  };
}

export async function deleteUser(id) {
  const user = await userRepository.getById(id);

  if (!user) {
    return null;
  }

  return await userRepository.delete(user);
}

export async function restoreUser(id) {
  const user = await userRepository.getById(id);

  if (!user) {
    return null;
  }

  return await userRepository.restore(user);
}

export async function passwordUser(id, data) {
  const user = await userRepository.getById(id);

  if (!user) {
    return null;
  }

  if (!data.old_password && !data.new_password && !data.repeat_password) {
    throw new Error('Las contraseñas son requeridas');
  }

  const isValidPassword = await bcrypt.compare(data.old_password, user.password);

  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }

  if (data.new_password !== data.repeat_password) {
    throw new Error('Las nuevas contraseñas no son iguales');
  }

  const newPassword = await bcrypt.hash(data.new_password, 10);
  const updated = await userRepository.update(id, { password: newPassword });

  const userResponse = updated.toObject();
  delete userResponse.password;

  return {
    user: userResponse
  };
}

export async function updateAvatar(id, file) {
  const user = await userRepository.getById(id);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Elimino avatar viejo
  if (user.avatar) {
    const oldPath = `public${user.avatar}`;
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  const filePath = `/uploads/avatars/${file.filename}`;
  const updated = await userRepository.update(id, { avatar: filePath });

  const userResponse = updated.toObject();
  delete userResponse.password;

  return {
    message: "Avatar actualizado",
    avatar: filePath,
    user: userResponse
  };
}