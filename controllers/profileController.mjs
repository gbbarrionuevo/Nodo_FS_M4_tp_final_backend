import { getUserById, updateUser, passwordUser } from '../services/userService.mjs';

export async function getProfileByIdController(req, res) {
  try {
    const { id } = req.user;
    const result = await getUserById(id);

    if (!result) {
      return res.status(400).json({
        message: 'Datos personales no encontrados'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar datos personales',
      error: error.message
    });
  }
}

export async function updateProfileController(req, res) {
  try {
    const { id } = req.user;
    const data = req.body;
    const result = await updateUser(id, data);

    if (!result) {
      return res.status(400).json({
        message: 'Datos personales no encontrados'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar datos personales',
      error: error.message
    });
  }
}

export async function passwordProfileController(req, res) {
  try {
    const { id } = req.user;
    const data = req.body;
    const result = await passwordUser(id, data);

    if (!result) {
      return res.status(400).json({
        message: 'Datos personales no encontrados'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar datos personales',
      error: error.message
    });
  }
}