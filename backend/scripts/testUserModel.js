const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to your User model

(async () => {
    const plainPassword = 'password123';

    // Simulate saving a user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    console.log('Plain password:', plainPassword);
    console.log('Hashed password:', hashedPassword);

    // Compare plain password with hashed password
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password match result:', isMatch);
})();
