const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const auth = require('../middleware/auth');
const { businessValidation } = require('../middleware/validation');

// POST /api/businesses
router.post('/', auth, businessValidation, businessController.createBusiness);

// GET /api/businesses/my
router.get('/my', auth, businessController.getMyBusinesses);

// GET /api/businesses
router.get('/', businessController.getAllBusinesses);

// GET /api/businesses/:id
router.get('/:id', businessController.getBusinessById);

// PUT /api/businesses/:id
router.put('/:id', auth, businessValidation, businessController.updateBusiness);

// DELETE /api/businesses/:id
router.delete('/:id', auth, businessController.deleteBusiness);

module.exports = router;