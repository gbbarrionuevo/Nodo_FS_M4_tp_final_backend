import { login, register, getUserRoles } from '../services/authService.mjs';

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error en el login',
      error: error.message
    });
  }
};

export async function registerController(req, res) {
  try {
    const data = req.body;
    const result = await register(data);

    if (!result) {
      res.status(500).json({
        message: 'No se pudo crear el usuario'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error en el registro',
      error: error.message
    });
  }
};

export async function getUserRolesController(req, res) {
  try {
    const roles = await getUserRoles(req.user.id);

    res.status(200).json({
      roles
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error obteniendo roles',
      error: error.message
    });
  }
}