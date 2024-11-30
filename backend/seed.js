const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Affirmation = require('./models/Affirmation');
const dummyAffirmations = require('./data/dummyAffirmations');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedDatabase = async () => {
  try {
    await Affirmation.deleteMany();  // Clears any existing data
    await Affirmation.insertMany(dummyAffirmations);  // Inserts the dummy affirmations
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
