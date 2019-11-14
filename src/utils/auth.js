const bcrypt = require('bcrypt');

exports.encryptPassword = (password, callback) => bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error({ err });
    return callback(err);
  }
  return callback(null, hash);
});
