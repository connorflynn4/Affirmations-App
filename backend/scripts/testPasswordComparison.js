const bcrypt = require('bcrypt');

const plainPassword = 'password12345'; // The password used during signup
const storedHash = '$2b$10$trpMFnhPtSpuIHpOnQJrJeQHGT33gY95Ygrbeh5pHThIf6rXf0QsO'; // Replace with the actual hash from DB

(async () => {
    const isMatch = await bcrypt.compare(plainPassword, storedHash);
    console.log('Password match result:', isMatch);
})();
