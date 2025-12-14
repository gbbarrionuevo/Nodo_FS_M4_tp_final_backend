import storeRepository from '../repositories/StoreRepository.mjs';

export async function getStoreAll() {
  return await storeRepository.getAll();
}