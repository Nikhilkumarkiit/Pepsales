

const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /users/:id/notifications - Get user notifications
router.get('/:id/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.id })
            .sort({ createdAt: -1 });
            
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;