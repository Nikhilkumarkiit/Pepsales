const amqp = require('amqplib');
const Notification = require('../models/Notification');
const { sendEmail } = require('./emailService');
const { sendSMS } = require('./smsService');

let channel;

// Connect to RabbitMQ
async function connectToQueue() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue('notifications');
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('RabbitMQ connection error:', error);
    }
}

// Add notification to queue
async function sendNotification(notification) {
    if (!channel) await connectToQueue();
    
    channel.sendToQueue(
        'notifications',
        Buffer.from(JSON.stringify(notification)),
        { persistent: true }
    );
}

// Process notifications from queue
async function processNotifications() {
    if (!channel) await connectToQueue();
    
    channel.consume('notifications', async (msg) => {
        if (msg !== null) {
            const notification = JSON.parse(msg.content.toString());
            
            try {
                // Send notification based on type
                switch (notification.type) {
                    case 'email':
                        await sendEmail(notification);
                        break;
                    case 'sms':
                        await sendSMS(notification);
                        break;
                    case 'in-app':
                        // In-app notifications are just stored in DB
                        break;
                }
                
                // Update notification status
                await Notification.findByIdAndUpdate(notification._id, {
                    status: 'sent'
                });
                
                channel.ack(msg);
            } catch (error) {
                console.error('Notification failed:', error);
                
                // Update retry count
                await Notification.findByIdAndUpdate(notification._id, {
                    status: 'failed',
                    $inc: { retryCount: 1 }
                });
                
                // Retry logic (simple version - in production you'd want more sophisticated retries)
                if (notification.retryCount < 3) {
                    channel.nack(msg, false, true); // Requeue the message
                } else {
                    channel.ack(msg); // Give up after 3 retries
                }
            }
        }
    });
}

module.exports = {
    connectToQueue,
    sendNotification,
    processNotifications
};