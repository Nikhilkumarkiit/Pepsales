



const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { sendNotification } = require('../services/notificationService');

// POST /notifications - Send a notification
router.post('/', async (req, res) => {
    try {
        const { userId, type, title, message } = req.body;
        
        // Create notification in database
        const notification = new Notification({
            userId,
            type,
            title,
            message
        });
        
        await notification.save();
        
        // Add to queue (will be processed by worker)
        await sendNotification(notification);
        
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;