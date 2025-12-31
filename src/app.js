require('dotenv').config();
const express = require('express');
const sequelize = require('./database/database');
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const propertyRoutes = require('./routes/properties');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/properties', propertyRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.sync();
    // The database is already configured, so we just need to start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();

module.exports = app;
