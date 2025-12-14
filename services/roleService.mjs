import roleRepository from '../repositories/RoleRepository.mjs';

export async function getRoleAll() {
  return await roleRepository.getAll();
}

export async function getRoleById(id) {
  return await roleRepository.getById(id);
}

export async function createRole(data) {
  if (data.permissions && !Array.isArray(data.permissions)) {
    data.permissions = [data.permissions];
  }

  return await roleRepository.create(data);
}

export async function updateRole(id, data) {
  const role = await roleRepository.getById(id);

  if (!role) {
    return null;
  }

  if (data.permissions && !Array.isArray(data.permissions)) {
    data.permissions = [data.permissions];
  }

  return await roleRepository.update(id, data);
}

export async function deleteRole(id) {
  const role = await roleRepository.getById(id);

  if (!role) {
    return null;
  }

  return await roleRepository.delete(role);
}