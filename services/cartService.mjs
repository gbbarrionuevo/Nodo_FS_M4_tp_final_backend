import cartRepository from '../repositories/CartRepository.mjs';
import cardRepository from '../repositories/CardRepository.mjs';
import userRepository from '../repositories/UserRepository.mjs';

export async function getCartByUser(userId) {
  let cart = await cartRepository.getByUser(userId);

  if (!cart) {
    cart = await cartRepository.create({
      user: userId,
      cards: []
    });
  }

  return cart;
}

export async function syncCart(userId, cardId, action) {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const card = await cardRepository.getById(cardId);
  if (!card) {
    throw new Error('Carta no encontrada');
  }

  // Validar stock antes de cualquier operación
  if (card.quantity <= 0) {
    throw new Error('Sin stock disponible');
  }

  let cart = await cartRepository.getByUser(userId);

  if (!cart && action === 'add') {
    return await cartRepository.create({
      user: userId,
      cards: [
        {
          card: card._id,
          quantity: 1,
          subtotal: card.price
        }
      ],
      total: card.price
    });
  }

  if (!cart) {
    throw new Error('Carrito no encontrado');
  }

  const item = cart.cards.find(c => c.card._id.toString() === cardId);

  if (action === 'add') {
    if (item) {
      // Si ya está en el carrito, valido que no se pase del stock real
      if (item.quantity + 1 > card.quantity) {
        throw new Error('Stock insuficiente');
      }

      item.quantity += 1;
      item.subtotal = item.quantity * card.price;
    } else {
      // Valido stock antes de agregar
      if (card.quantity < 1) {
        throw new Error('Stock insuficiente');
      }

      cart.cards.push({
        card: card._id,
        quantity: 1,
        subtotal: card.price
      });
    }
  }

  if (action === 'remove') {
    if (!item) {
      return cart;
    }

    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart.cards = cart.cards.filter(c => c.card._id.toString() !== cardId);
    } else {
      item.subtotal = item.quantity * card.price;
    }
  }

  if (cart.cards.length === 0) {
    await cartRepository.delete(cart);
    return null;
  }

  cart.total = cart.cards.reduce((acc, c) => acc + c.subtotal, 0);

  const updated = await cartRepository.update(cart._id, {
    cards: cart.cards,
    total: cart.total
  });

  return await updated.populate({
    path: "cards.card",
    model: "Card"
  });
}