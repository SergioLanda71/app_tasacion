const Client = require('../models/client');

const createClient = async (req, res, next) => {
  try {
    const { nombre_razon_social, telefono, email } = req.body;
    const client = await Client.create({
      nombre_razon_social,
      telefono,
      email,
    });
    res.status(201).json({ message: 'Client created successfully', clientId: client.id });
  } catch (error) {
    next(error);
  }
};

const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      const error = new Error('Client not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_razon_social, telefono, email } = req.body;
    const client = await Client.findByPk(id);

    if (!client) {
      const error = new Error('Client not found');
      error.statusCode = 404;
      throw error;
    }

    client.nombre_razon_social = nombre_razon_social;
    client.telefono = telefono;
    client.email = email;
    await client.save();

    res.status(200).json({ message: 'Client updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      const error = new Error('Client not found');
      error.statusCode = 404;
      throw error;
    }

    await client.destroy();
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
