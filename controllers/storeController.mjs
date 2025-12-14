import { getStoreAll } from '../services/storeService.mjs';

export async function getStoreAllController(req, res) {
  try {
    const result = await getStoreAll();

    if (!result) {
      res.status(400).json({
        message: 'No hay información'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener la tienda',
      error: error.message
    });
  }
}