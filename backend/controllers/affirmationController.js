const Affirmation = require('../models/Affirmation');

// Get all affirmations
const getAffirmations = async (req, res) => {
  try {
    const affirmations = await Affirmation.find();
    res.json(affirmations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new affirmation
const createAffirmation = async (req, res) => {
  const { text } = req.body;
  const newAffirmation = new Affirmation({ text });

  try {
    await newAffirmation.save();
    res.status(201).json(newAffirmation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an affirmation by ID
const deleteAffirmation = async (req, res) => {
  try {
    await Affirmation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Affirmation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAffirmations,
  createAffirmation,
  deleteAffirmation,
};
