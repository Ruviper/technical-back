const { createValidator } = require('./validators');
const { encryptPassword } = require('../../utils/auth');

const db = require('../../db');

module.exports = ({ db }) => {
  const findAll = async () => {
    try {
      const users = await db.User.findAll();
      return users;
    } catch (err) {
      const error = {
        code: 'users.findAll',
        message: `Error while finding all users, ${err.message}`,
      };
      throw error;
    }
  };

  const create = async ({ userToBeCreated }) => {
    try {
      const validation = createValidator(userToBeCreated);
      if (validation.error) {
        const error = {
          code: 'users.validation',
          message: validation.error.details,
        };
        throw error.message;
      }
      // const user = await db.User.findOne({
      //   where: { userName: userToBeCreated.userName },
      // });
      // if (user) {
      //   console.error('User already exists');
      //   const error = {
      //     code: 'user.exists',
      //     message: 'User with this userName already exists,',
      //   };
      //   throw error;
      // }
      const hash = await encryptPassword(userToBeCreated.password, (err) => {
        if (err) {
          console.error('The password could not be hashed.');
          return reject('The password could not be hashed.');
        }
      });
      const newUser = await db.User.create({ ...userToBeCreated, password: hash });
      return newUser;
    } catch (err) {
      const error = {
        code: 'user.create.error',
        message: `Error while create user, ${err.message}`,
      };
      throw error;
    }
  };
 
  return { findAll, create };
};
