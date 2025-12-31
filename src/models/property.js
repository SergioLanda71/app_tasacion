const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Client = require('./client');

const Property = sequelize.define('Property', {
  client_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Client,
      key: 'id'
    }
  },
  titulo_propiedad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_operacion: {
    type: DataTypes.STRING
  },
  tipo_inmueble: {
    type: DataTypes.STRING
  },
  direccion: {
    type: DataTypes.STRING
  },
  ambientes: {
    type: DataTypes.INTEGER
  },
  banos: {
    type: DataTypes.INTEGER
  },
  cocheras: {
    type: DataTypes.INTEGER
  },
  superficie_cubierta: {
    type: DataTypes.DECIMAL(10, 2)
  },
  superficie_semicubierta: {
    type: DataTypes.DECIMAL(10, 2)
  },
  superficie_descubierta: {
    type: DataTypes.DECIMAL(10, 2)
  },
  superficie_total: {
    type: DataTypes.DECIMAL(10, 2)
  },
  expensas: {
    type: DataTypes.DECIMAL(10, 2)
  },
  abl: {
    type: DataTypes.DECIMAL(10, 2)
  },
  estado_inmueble: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'properties',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Property.belongsTo(Client, { foreignKey: 'client_id' });

module.exports = Property;
