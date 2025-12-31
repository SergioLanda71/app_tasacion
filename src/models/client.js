const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Client = sequelize.define('Client', {
  nombre_razon_social: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'clients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Client;
