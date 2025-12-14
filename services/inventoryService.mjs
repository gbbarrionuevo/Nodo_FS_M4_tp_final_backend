import inventoryRepository from '../repositories/InventoryRepository.mjs';

export async function addPurchaseToInventory(userId, cards) {
  let inventory = await inventoryRepository.getByUser(userId);

  if (!inventory) {
    inventory = await inventoryRepository.create({
      user: userId,
      cards: cards.map(c => ({
        card: c.card,
        quantity: c.quantity
      }))
    });

    return inventory;
  }

  // Actualizo cantidades
  for (const c of cards) {
    const found = inventory.cards.find(i => i.card.toString() === c.card.toString());

    if (found) {
      found.quantity += c.quantity;
    } else {
      inventory.cards.push({
        card: c.card,
        quantity: c.quantity
      });
    }
  }

  return await inventoryRepository.update(inventory._id, {
    cards: inventory.cards
  });
}

export async function getInventoryByUser(userId) {
  return await inventoryRepository.getByUser(userId);
}

export async function getInventoryItem(userId, cardId) {
  const inventory = await inventoryRepository.getByUser(userId);

  if (!inventory) {
    throw new Error('Inventario no encontrado');
  }

  const card = inventory.cards.find(c => c.card.id.toString() === cardId);

  if (!card) {
    throw new Error('Carta no encontrada');
  }

  return card;
}