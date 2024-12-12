const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const {
    getMeditationVideos,
    createMeditationVideo,
    deleteMeditationVideo,
} = require('../controllers/meditationController');

const router = express.Router();

// Public route
router.get('/', getMeditationVideos);

// Protected routes
router.post('/', authenticateToken, createMeditationVideo);
router.delete('/:id', authenticateToken, deleteMeditationVideo);

module.exports = router;
