const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

// GET /api/notifications
router.get('/', auth, notificationController.getNotifications);

// PUT /api/notifications/:id/read
router.put('/:id/read', auth, notificationController.markAsRead);
// PUT /api/notifications/read-all
router.put('/read-all', auth, notificationController.markAllAsRead);
// DELETE /api/notifications/:id
router.delete('/:id', auth, notificationController.deleteNotification);
module.exports = router;