import { getPurchaseByUser, createPurchase } from '../services/purchaseService.mjs';

export async function getPurchaseByUserController(req, res) {
  try {
    const { id } = req.user;
    const result = await getPurchaseByUser(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las compras',
      error: error.message
    });
  }
}

export async function createPurchaseController(req, res) {
  try {
    const { payment } = req.body;
    const result = await createPurchase(req.user.id, payment);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear la compra',
      error: error.message
    });
  }
}