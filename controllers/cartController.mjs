import { getCartByUser, syncCart } from '../services/cartService.mjs';

export async function getCartByUserController(req, res) {
  try {
    const { id } = req.user;
    const result = await getCartByUser(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el carrito',
      error: error.message
    });
  }
}

export async function syncCartController(req, res) {
  try {
    const { id } = req.user;
    const { cardId, action } = req.body;

    if (!cardId && !action) {
      return res.status(400).json({
        message: 'Datos incompletos'
      });
    }

    const result = await syncCart(id, cardId, action);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al sincronizar el carrito',
      error: error.message
    });
  }
}