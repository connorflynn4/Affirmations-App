const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use env variable in production

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });
};

module.exports = { generateToken };
