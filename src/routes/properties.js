const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/properties');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, propertyController.createProperty);
router.get('/', authenticateToken, propertyController.getAllProperties);
router.get('/:id', authenticateToken, propertyController.getPropertyById);
router.put('/:id', authenticateToken, propertyController.updateProperty);
router.delete('/:id', authenticateToken, propertyController.deleteProperty);
router.post('/:id/images', authenticateToken, propertyController.addImageToProperty);

module.exports = router;
