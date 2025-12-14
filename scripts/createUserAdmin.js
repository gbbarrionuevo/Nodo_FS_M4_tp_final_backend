import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/dbConfig.mjs';
import User from '../models/User.mjs';
import Role from '../models/Role.mjs';

dotenv.config();
await connectDB();

async function createAdminUser() {
  try {
    console.log('Buscando rol admin...');
    const adminRole = await Role.findOne({ name: 'admin' });

    if (!adminRole) {
      throw new Error('Rol admin no encontrado. Ejecutá primero createRolesAndPermissions.js');
    }

    console.log('Verificando si el usuario admin ya existe...');
    const exists = await User.findOne({
      $or: [
        { user_name: 'admin' },
        { email: 'admin@gmail.com' }
      ]
    });

    if (exists) {
      console.log('El usuario admin ya existe. No se crea nuevamente.');
      process.exit(0);
    }

    const passwordHashed = await bcrypt.hash('123', 10);

    const adminUser = {
      user_name: 'admin',
      password: passwordHashed,
      email: 'admin@gmail.com',
      first_name: 'Admin',
      last_name: 'Admin',
      direccion: null,
      avatar: null,
      roles: [adminRole._id],
      deletedAt: null
    };

    await User.create(adminUser);

    console.log('Usuario admin creado correctamente!');
    console.log('Credenciales -> user: admin | pass: 123');

    process.exit(0);
  } catch (error) {
    console.error('Error al crear usuario admin:', error);
    process.exit(1);
  }
}

createAdminUser();
