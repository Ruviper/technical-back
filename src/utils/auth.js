const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createToken = (user) => {
  const payload = {
    userName: user.userName,
  };
  return jwt.sign(payload, 'process.env.JWT_SECRET', {});
};

exports.verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, 'process.env.JWT_SECRET', (err, user) => {
    if (err) {
      console.log('[verifyToken] error while decoding JWT token', err);
      return reject(err);
    }
    return resolve(user);
  });
});

exports.encryptPassword = password => new Promise((resolve, reject) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log('[encryptPassword] error while encrypt password', err);
      return reject(err);
    }
    return resolve(hash);
  });
});

exports.comparePassword = (currentPassword, candidatePassword, callback) => (
  bcrypt.compare(candidatePassword, currentPassword, (err, isMatch) => {
    if (err) {
      console.error(err);
      return callback(err);
    }
    return callback(null, isMatch);
  })
);
