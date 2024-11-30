const mongoose = require('mongoose');

const affirmationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Affirmation', affirmationSchema);
