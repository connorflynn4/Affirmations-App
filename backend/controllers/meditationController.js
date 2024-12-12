const Meditation = require('../models/Meditation');

// Get all meditation videos
const getMeditationVideos = async (req, res) => {
  try {
    const videos = await Meditation.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new meditation video
const createMeditationVideo = async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ message: 'Title and URL are required' });
  }

  const newVideo = new Meditation({ title, url });

  try {
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a meditation video by ID
const deleteMeditationVideo = async (req, res) => {
  try {
    const video = await Meditation.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Meditation video not found' });
    }

    await Meditation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meditation video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMeditationVideos,
  createMeditationVideo,
  deleteMeditationVideo,
};
