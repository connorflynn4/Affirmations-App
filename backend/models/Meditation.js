const mongoose = require('mongoose');

const MeditationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        // Ensure the URL is valid and contains 'youtube.com' or 'youtu.be'
        return /(youtube\.com|youtu\.be)/.test(value);
      },
      message: (props) => `${props.value} is not a valid YouTube URL.`,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Meditation', MeditationSchema);
