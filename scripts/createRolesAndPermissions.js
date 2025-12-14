import dotenv from 'dotenv';
import { connectDB } from '../config/dbConfig.mjs';
import Permission from '../models/Permission.mjs';
import Role from '../models/Role.mjs';

dotenv.config();
await connectDB();

const initialPermissions = [
  { name: 'read:admin', description: 'Puede ver administración' },

  { name: 'read:card', description: 'Puede ver listado de cartas' },
  { name: 'create:card', description: 'Puede crear cartas' },
  { name: 'update:card', description: 'Puede actualizar cartas' },
  { name: 'delete:card', description: 'Puede eliminar cartas' },

  { name: 'read:cart', description: 'Puede ver carrito de compras' },
  { name: 'create:cart', description: 'Puede crear carrito de compras' },
  { name: 'update:cart', description: 'Puede actualizar carrito de compras' },
  { name: 'delete:cart', description: 'Puede eliminar carrito de compras' },

  { name: 'read:contact', description: 'Puede ver contactos' },
  { name: 'create:contact', description: 'Puede crear contactos' },
  { name: 'delete:contact', description: 'Puede eliminar contactos' },

  { name: 'read:inventory', description: 'Puede ver listado del inventario' },
  { name: 'read:inventory-item-detail', description: 'Puede ver detalle de un item del inventario' },

  { name: 'read:permission', description: 'Puede ver listado de permisos' },
  { name: 'create:permission', description: 'Puede crear permisos' },
  { name: 'update:permission', description: 'Puede actualizar permisos' },
  { name: 'delete:permission', description: 'Puede eliminar permisos' },

  { name: 'read:profile', description: 'Puede ver perfil de usuario' },
  { name: 'update:profile', description: 'Puede actualizar perfil de usuario' },

  { name: 'read:purchase', description: 'Puede ver compras' },
  { name: 'create:purchase', description: 'Puede crear compras' },

  { name: 'read:role', description: 'Puede ver listado de roles' },
  { name: 'create:role', description: 'Puede crear roles' },
  { name: 'update:role', description: 'Puede actualizar roles' },
  { name: 'delete:role', description: 'Puede eliminar roles' },

  { name: 'read:store', description: 'Puede ver tienda' },

  { name: 'read:user', description: 'Puede ver listado de usuarios' },
  { name: 'create:user', description: 'Puede crear usuarios' },
  { name: 'update:user', description: 'Puede actualizar usuarios' },
  { name: 'delete:user', description: 'Puede eliminar usuarios' },
  { name: 'restore:user', description: 'Puede restaurar usuarios' },
];

const initialRoles = [
  {
    name: 'admin',
    description: 'Administrador del sistema',
    permissions: [
      'read:admin',

      'read:card',
      'create:card',
      'update:card',
      'delete:card',

      'read:cart',
      'create:cart',
      'update:cart',
      'delete:cart',

      'read:contact',
      'create:contact',
      'delete:contact',

      'read:inventory',
      'read:inventory-item-detail',

      'read:permission',
      'create:permission',
      'update:permission',
      'delete:permission',

      'read:profile',
      'update:profile',

      'read:purchase',
      'create:purchase',

      'read:role',
      'create:role',
      'update:role',
      'delete:role',

      'read:store',

      'read:user',
      'create:user',
      'update:user',
      'delete:user',
      'restore:user'
    ]
  },
  {
    name: 'user',
    description: 'Usuario básico',
    permissions: [
      'read:cart',
      'create:cart',
      'update:cart',
      'delete:cart',

      'create:contact',

      'read:inventory',
      'read:inventory-item-detail',

      'read:profile',
      'update:profile',

      'read:purchase',
      'create:purchase',

      'read:role',

      'read:store',

      'read:user'
    ]
  }
];

async function initializeRolesAndPermissions() {
  try {
    console.log('Limpiando colecciones...');
    await Permission.collection.dropIndexes().catch(() => { });
    await Permission.deleteMany({});

    await Role.collection.dropIndexes().catch(() => { });
    await Role.deleteMany({});

    console.log('Colecciones limpiadas correctamente!');

    const createdPermissions = await Permission.insertMany(initialPermissions);
    console.log('Permisos creados correctamente!');

    const permissionsMap = createdPermissions.reduce((map, permission) => {
      map[permission.name] = permission._id;
      return map;
    }, {});

    const rolesToCreate = initialRoles.map(role => ({
      name: role.name,
      description: role.description,
      permissions: role.permissions.map(permName => permissionsMap[permName])
    }));

    await Role.insertMany(rolesToCreate);
    console.log('Roles creados correctamente!');
    process.exit(0);
  } catch (error) {
    console.error('Error al sincronizar roles y permisos:', error);
    process.exit(1);
  }
}

initializeRolesAndPermissions();