const Property = require('../models/property');
const Image = require('../models/image');

const createProperty = async (req, res, next) => {
  try {
    const {
      client_id,
      titulo_propiedad,
      tipo_operacion,
      tipo_inmueble,
      direccion,
      ambientes,
      banos,
      cocheras,
      superficie_cubierta,
      superficie_semicubierta,
      superficie_descubierta,
      superficie_total,
      expensas,
      abl,
      estado_inmueble,
      descripcion,
    } = req.body;

    const property = await Property.create({
      client_id,
      titulo_propiedad,
      tipo_operacion,
      tipo_inmueble,
      direccion,
      ambientes,
      banos,
      cocheras,
      superficie_cubierta,
      superficie_semicubierta,
      superficie_descubierta,
      superficie_total,
      expensas,
      abl,
      estado_inmueble,
      descripcion,
    });

    res.status(201).json({ message: 'Property created successfully', propertyId: property.id });
  } catch (error) {
    next(error);
  }
};

const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.findAll({ include: [Image] });
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id, { include: [Image] });

    if (!property) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      client_id,
      titulo_propiedad,
      tipo_operacion,
      tipo_inmueble,
      direccion,
      ambientes,
      banos,
      cocheras,
      superficie_cubierta,
      superficie_semicubierta,
      superficie_descubierta,
      superficie_total,
      expensas,
      abl,
      estado_inmueble,
      descripcion,
    } = req.body;

    const property = await Property.findByPk(id);

    if (!property) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    await property.update({
      client_id,
      titulo_propiedad,
      tipo_operacion,
      tipo_inmueble,
      direccion,
      ambientes,
      banos,
      cocheras,
      superficie_cubierta,
      superficie_semicubierta,
      superficie_descubierta,
      superficie_total,
      expensas,
      abl,
      estado_inmueble,
      descripcion,
    });

    res.status(200).json({ message: 'Property updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    await property.destroy();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const addImageToProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { url, descripcion, es_portada } = req.body;

    const property = await Property.findByPk(id);

    if (!property) {
      const error = new Error('Property not found');
      error.statusCode = 404;
      throw error;
    }

    const image = await Image.create({
      property_id: id,
      url,
      descripcion,
      es_portada,
    });

    res.status(201).json({ message: 'Image added successfully', imageId: image.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  addImageToProperty,
};
