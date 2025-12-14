import userRepository from '../repositories/UserRepository.mjs';
import roleRepository from '../repositories/RoleRepository.mjs';
import { generateToken } from '../utils/generateToken.mjs';
import bcrypt from 'bcryptjs';

export async function login(email, password) {
  const user = await userRepository.getOne({ email });

  if (!user) {
    throw new Error('Correo o contraseña incorrectos');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Correo o contraseña incorrectos');
  }

  const userResponse = user.toObject();
  delete userResponse.password;

  const token = generateToken(user);

  return {
    user: userResponse,
    token
  };
}

export async function register(data) {
  const existUser = await userRepository.getOne({
    $or: [
      { user_name: data.user_name },
      { email: data.email }
    ]
  });

  if (existUser) {
    throw new Error('Usuario o email ya existe');
  }

  const passwordHashed = await bcrypt.hash(data.password, 10);

  const roleDefault = await roleRepository.getOne({ name: 'user' });
  if (!roleDefault) {
    throw new Error('Rol por defecto no encontrado');
  }

  const user = await userRepository.create({
    ...data,
    password: passwordHashed,
    roles: roleDefault._id
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  const token = generateToken(user);

  return {
    user: userResponse,
    token
  };
}

export async function getUserRoles(id) {
  const user = await userRepository.getById(id);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user.roles;
}