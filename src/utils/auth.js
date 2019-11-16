const bcrypt = require('bcrypt');

exports.encryptPassword = password => new Promise((resolve, reject) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log('[encryptPassword] error while encrypt password', err);
      return reject(err);
    }
    return resolve(hash);
  });
});
