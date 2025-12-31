const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Property = require('./property');

const Image = sequelize.define('Image', {
  property_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Property,
      key: 'id'
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING
  },
  es_portada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'images',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Image.belongsTo(Property, { foreignKey: 'property_id' });
Property.hasMany(Image, { foreignKey: 'property_id' });


module.exports = Image;
