import { getUserAll, getUserById, createUser, updateUser, deleteUser, restoreUser, updateAvatar } from '../services/userService.mjs';

export async function getUserAllController(req, res) {
  try {
    const result = await getUserAll();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los usuarios',
      error: error.message
    });
  }
}

export async function getUserByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getUserById(id);

    if (!result) {
      return res.status(400).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar el usuario',
      error: error.message
    });
  }
}

export async function createUserController(req, res) {
  try {
    const data = req.body;
    const result = await createUser(data);

    if (!result) {
      return res.status(500).json({
        message: 'No se pudo crear el usuario'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el usuario',
      error: error.message
    });
  }
};

export async function updateUserController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateUser(id, data);

    if (!result) {
      return res.status(400).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el usuario',
      error: error.message
    });
  }
}

export async function deleteUserController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);

    if (!result) {
      return res.status(400).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el usuario',
      error: error.message
    });
  }
}

export async function restoreUserController(req, res) {
  try {
    const { id } = req.params;
    const result = await restoreUser(id);

    if (!result) {
      return res.status(400).json({
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al restaurar el usuario',
      error: error.message
    });
  }
}

export async function updateAvatarController(req, res) {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        message: "Avatar requerido"
      });
    }

    const result = await updateAvatar(userId, req.file);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar avatar",
      error: error.message
    });
  }
}