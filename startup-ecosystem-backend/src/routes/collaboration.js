const express = require('express');
const router = express.Router();
const collaborationController = require('../controllers/collaborationController');
const auth = require('../middleware/auth');
const { collaborationValidation } = require('../middleware/validation');

// POST /api/collaborations
router.post('/', auth, collaborationValidation, collaborationController.sendRequest);

// PUT /api/collaborations/:id/respond
router.put('/:id/respond', auth, collaborationController.respondToRequest);

// GET /api/collaborations/sent
router.get('/sent', auth, collaborationController.getSentRequests);

// GET /api/collaborations/received
router.get('/received', auth, collaborationController.getReceivedRequests);

module.exports = router;