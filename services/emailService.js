const nodemailer = require('nodemailer');

// Mailtrap configuration (DEV ONLY)
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // From your Mailtrap dashboard
  port: 2525,                       // Recommended port
  auth: {
    user: "ec73677833ab87",         // Your Mailtrap username
    pass: "d399ff1965ca49"      // Replace with actual password
  }
});

async function sendEmail(notification) {
  try {
    const mailOptions = {
      from: '"Notification Service" <notifications@example.com>',
      to: notification.email,       // Should come from user data
      subject: notification.title,
      text: notification.message
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${mailOptions.to}`);
  } catch (error) {
    console.error('Email send error:', error);
    throw error; // Let worker handle retries
  }
}

module.exports = { sendEmail };