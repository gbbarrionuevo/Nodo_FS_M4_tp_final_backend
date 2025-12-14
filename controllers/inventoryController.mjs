import { getInventoryByUser, getInventoryItem } from '../services/inventoryService.mjs';

export async function getInventoryByUserController(req, res) {
  try {
    const { id } = req.user;
    const result = await getInventoryByUser(id);

    if (!result) {
      return res.status(200).json({
        cards: []
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el inventario',
      error: error.message
    });
  }
}

export async function getInventoryItemController(req, res) {
  try {
    const result = await getInventoryItem(req.user.id, req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener la carta',
      error: error.message
    });
  }
}