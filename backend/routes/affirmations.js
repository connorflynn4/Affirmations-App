const express = require('express');
const router = express.Router();
const {
  getAffirmations,
  createAffirmation,
  deleteAffirmation,
} = require('../controllers/affirmationController');

router.get('/', getAffirmations);
router.post('/', createAffirmation);
router.delete('/:id', deleteAffirmation);

module.exports = router;
