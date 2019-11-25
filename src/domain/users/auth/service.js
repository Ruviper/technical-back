const validator = require('./validator');
const {
  createToken,
  verifyToken,
  comparePassword,
} = require('../../../utils/auth');

module.exports = ({ db }) => {
  const login = args => new Promise((resolve, reject) => {
    const validation = validator(args);
    if (validation.error) {
      return reject(validation.error.details);
    }
    return db.User.findOne({ where: { userName: args.userName }, plain: true })
      .then((user) => {
        if (!user) {
          console.error('User not found');
          return reject({
            code: 'user.not_found',
            message: 'Authentication failed. User not found.',
          });
        }
        return comparePassword(user.password, args.password, (err, isMatch) => {
          if (err) {
            return reject(err);
          }
          if (!isMatch) {
            console.error('Password is wrong');
            return reject({
              code: 'password.wrong',
              message: 'Wrong password.',
            });
          }
          console.log(`User ${user.userName} correctly logged in`);
          const token = createToken({ id: user.id, email: user.email });
          return resolve(token);
        });
      })
      .catch(err => reject(err));
  });

  return {
    login,
  };
};
