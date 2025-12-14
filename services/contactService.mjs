import contactRepository from '../repositories/ContactRepository.mjs';

export async function getContactAll() {
  return await contactRepository.getAll();
}

export async function getContactById(id) {
  return await contactRepository.getById(id);
}

export async function createContact(userId, data) {
  return await contactRepository.create({
    user: userId,
    message: data.message
  });
}

export async function deleteContact(id) {
  const permission = await contactRepository.getById(id);

  if (!permission) {
    return null;
  }

  return await contactRepository.delete(permission);
}