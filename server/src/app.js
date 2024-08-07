require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// MongoDB connection using environment variables
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
});

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

module.exports = app; // Export the app for use in server and tests
