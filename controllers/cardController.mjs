import { getCardAll, getCardById, createCard, updateCard, deleteCard } from '../services/cardService.mjs';

export async function getCardAllController(req, res) {
  try {
    const result = await getCardAll();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las cartas',
      error: error.message
    });
  }
}

export async function getCardByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getCardById(id);

    if (!result) {
      return res.status(400).json({
        message: 'Carta no encontrada'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar la carta',
      error: error.message
    });
  }
}

export async function createCardController(req, res) {
  try {
    const data = req.body;
    const result = await createCard(data);

    if (!result) {
      return res.status(500).json({
        message: 'No se pudo crear la carta'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear la carta',
      error: error.message
    });
  }
}

export async function updateCardController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateCard(id, data);

    if (!result) {
      return res.status(400).json({
        message: 'Carta no encontrada'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar la carta',
      error: error.message
    });
  }
}

export async function deleteCardController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteCard(id);

    if (!result) {
      return res.status(400).json({
        message: 'Carta no encontrada'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar la carta',
      error: error.message
    });
  }
}