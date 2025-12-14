import permissionRepository from '../repositories/PermissionRepository.mjs';

export async function getPermissionAll() {
  return await permissionRepository.getAll();
}

export async function getPermissionById(id) {
  return await permissionRepository.getById(id);
}

export async function createPermission(data) {
  return await permissionRepository.create(data);
}

export async function updatePermission(id, data) {
  const permission = await permissionRepository.getById(id);

  if (!permission) {
    return null;
  }

  return await permissionRepository.update(id, data);
}

export async function deletePermission(id) {
  const permission = await permissionRepository.getById(id);

  if (!permission) {
    return null;
  }

  return await permissionRepository.delete(permission);
}