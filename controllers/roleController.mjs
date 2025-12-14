import { getRoleAll, getRoleById, createRole, updateRole, deleteRole } from '../services/roleService.mjs';

export async function getRoleAllController(req, res) {
  try {
    const result = await getRoleAll();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los roles',
      error: error.message
    });
  }
}

export async function getRoleByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getRoleById(id);

    if (!result) {
      return res.status(400).json({
        message: 'Rol no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar el rol',
      error: error.message
    });
  }
}

export async function createRoleController(req, res) {
  try {
    const data = req.body;
    const result = await createRole(data);

    if (!result) {
      return res.status(500).json({
        message: 'No se pudo crear el rol'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el rol',
      error: error.message
    });
  }
}

export async function updateRoleController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateRole(id, data);

    if (!result) {
      return res.status(400).json({
        message: 'Rol no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el rol',
      error: error.message
    });
  }
}

export async function deleteRoleController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteRole(id);

    if (!result) {
      return res.status(400).json({
        message: 'Rol no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el rol',
      error: error.message
    });
  }
}