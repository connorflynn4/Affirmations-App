const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const affirmationsRouter = require('./routes/affirmations');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const meditationsRouter = require('./routes/meditationRoutes'); // Import the meditations routes

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/affirmations', affirmationsRouter); // Affirmations routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/meditations', meditationsRouter); // Meditations routes

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Affirmations API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
