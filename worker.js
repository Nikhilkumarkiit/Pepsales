require('dotenv').config();
const mongoose = require('mongoose');
const { connectToQueue, processNotifications } = require('./services/notificationService');

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Worker connected to MongoDB');
    // Start processing notifications
    connectToQueue().then(() => processNotifications());
})
.catch(err => console.error('Worker MongoDB connection error:', err));