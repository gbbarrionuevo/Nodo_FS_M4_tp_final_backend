import cardRepository from '../repositories/CardRepository.mjs';
import cartRepository from '../repositories/CartRepository.mjs';
import purchaseRepository from '../repositories/PurchaseRepository.mjs';
import { addPurchaseToInventory } from './inventoryService.mjs';

export async function getPurchaseByUser(userId) {
  return await purchaseRepository.getByUser(userId);
}

export async function createPurchase(userId, paymentData) {
  const cart = await cartRepository.getByUser(userId);
  if (!cart || cart.cards.length === 0) {
    throw new Error('Carrito no encontrado');
  }

  // Validación de stock por carta
  for (const item of cart.cards) {
    const card = await cardRepository.getById(item.card);

    if (!card) {
      throw new Error(`Carta no encontrada: ${item.card}`);
    }
    if (card.quantity <= 0) {
      throw new Error(`Stock agotado para la carta: ${card._id}`);
    }
    if (card.quantity < item.quantity) {
      throw new Error(`Stock insuficiente para la carta: ${card._id}`);
    }
  }

  // Creo la compra
  const purchaseData = {
    user: userId,
    cards: cart.cards.map(c => ({
      card: c.card._id ? c.card._id.toString() : c.card.toString(),
      quantity: c.quantity,
      subtotal: c.subtotal
    })),
    payment: {
      type: paymentData.type,
      cardNumber: paymentData.cardNumber,
      expirationDate: paymentData.expirationDate,
      securityCode: paymentData.securityCode,
      holderName: paymentData.holderName,
      holderLastName: paymentData.holderLastName,
      installments: paymentData.installments || 1,
      subtotal: paymentData.subtotal,
      interests: paymentData.interests || 0,
      total: paymentData.total
    },
    status: 'Approved'
  };

  const purchase = await purchaseRepository.create(purchaseData);

  // Agrego cartas al inventario del usuario
  await addPurchaseToInventory(userId, cart.cards);

  // Descuento stock de cartas
  for (const item of cart.cards) {
    await cardRepository.updateQuantity(item.card, -item.quantity);
  }

  // Elimino carrito del usuario
  await cartRepository.delete(cart);

  return purchase;
}