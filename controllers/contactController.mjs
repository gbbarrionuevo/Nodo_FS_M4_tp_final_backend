import { getContactAll, getContactById, createContact, deleteContact } from '../services/contactService.mjs';

export async function getContactAllController(req, res) {
  try {
    const result = await getContactAll();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los contactos',
      error: error.message
    });
  }
}

export async function getContactByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getContactById(id);

    if (!result) {
      return res.status(400).json({
        message: 'Contacto no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar el contacto',
      error: error.message
    });
  }
}

export async function createContactController(req, res) {
  try {
    const data = req.body;
    const result = await createContact(req.user.id, data);

    if (!result) {
      return res.status(500).json({
        message: 'No se pudo crear el contacto'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el contacto',
      error: error.message
    });
  }
};

export async function deleteContactController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteContact(id);

    if (!result) {
      return res.status(400).json({
        message: 'Contacto no encontrado'
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el contacto',
      error: error.message
    });
  }
}