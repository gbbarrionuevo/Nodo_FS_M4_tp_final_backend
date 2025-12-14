import cardRepository from '../repositories/CardRepository.mjs';

export async function getCardAll() {
  return await cardRepository.getAll();
}

export async function getCardById(id) {
  return await cardRepository.getById(id);
}

export async function createCard(data) {
  return await cardRepository.create(data);
}

export async function updateCard(id, data) {
  const card = await cardRepository.getById(id);

  if (!card) {
    return null;
  }

  return await cardRepository.update(id, data);
}

export async function deleteCard(id) {
  const card = await cardRepository.getById(id);

  if (!card) {
    return null;
  }

  return await cardRepository.delete(card);
}