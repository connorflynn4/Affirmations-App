const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const {
    getAffirmations,
    createAffirmation,
    deleteAffirmation,
} = require('../controllers/affirmationController');

const router = express.Router();

// Public route
router.get('/', getAffirmations);

// Protected routes
router.post('/', authenticateToken, createAffirmation);
router.delete('/:id', authenticateToken, deleteAffirmation);

module.exports = router;
