// For development, we'll mock SMS sending
// In production, you would use Twilio or similar service

async function sendSMS(notification) {
    console.log(`Mock SMS sent: ${notification.message}`);
    // In a real implementation:
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = require('twilio')(accountSid, authToken);
    // 
    // return client.messages.create({
    //     body: notification.message,
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: user.phone
    // });
}

module.exports = { sendSMS };