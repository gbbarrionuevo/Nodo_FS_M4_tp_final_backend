import { getPermissionAll, getPermissionById, createPermission, updatePermission, deletePermission } from '../services/permissionService.mjs';

export async function getPermissionAllController(req, res) {
  try {
    const result = await getPermissionAll();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los permisos',
      error: error.message
    });
  }
}

export async function getPermissionByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getPermissionById(id);

    if (!result) {
      return res.status(400).json({
        message: 'Permiso no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar el permiso',
      error: error.message
    });
  }
}

export async function createPermissionController(req, res) {
  try {
    const data = req.body;
    const result = await createPermission(data);

    if (!result) {
      return res.status(500).json({
        message: 'No se pudo crear el permiso'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el permiso',
      error: error.message
    });
  }
}

export async function updatePermissionController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updatePermission(id, data);

    if (!result) {
      return res.status(400).json({
        message: 'Permiso no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el permiso',
      error: error.message
    });
  }
}

export async function deletePermissionController(req, res) {
  try {
    const { id } = req.params;
    const result = await deletePermission(id);

    if (!result) {
      return res.status(400).json({
        message: 'Permiso no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el permiso',
      error: error.message
    });
  }
}