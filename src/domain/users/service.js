const { 
  createValidator,
  updateValidator,
} = require('./validators');
const { encryptPassword } = require('../../utils/auth');

const db = require('../../db');

module.exports = () => {
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

  const create = async (userToBeCreated) => {
    try {
      const validation = createValidator(userToBeCreated);
      if (validation.error) {
        const error = {
          code: 'users.validation',
          message: validation.error.details,
        };
        throw error.message;
      }
      const user = await db.User.findOne({
        where: { userName: userToBeCreated.userName },
      });
      if (user) {
        console.error('User already exists');
        const error = {
          code: 'user.exists',
          message: 'User with this userName already exists,',
        };
        throw error;
      }
      const hash = await encryptPassword(userToBeCreated.password);
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

  const update = async (id, body) => {
    const validation = updateValidator(body);
    if (validation.error) {
      const error = {
        code: 'user.validation',
        message: validation.error.details,
      };
      throw error;
    }
    try {
      const updatedUser = await db.User.update(body, {
        where: { id },
        returning: true,
        plain: true,
      });
      return updatedUser[1];
    } catch (err) {
      const error = {
        code: 'user.update',
        message: `Error while updating users ${err}`,
      };
      throw error;
    }
  };

  const deleteById = ({ id }) => new Promise((resolve, reject) => User.findByPk(id)
    .then((user) => {
      if (!user) {
        return reject({
          code: 'user.delete',
          message: 'user does not exist',
        });
      }
      return user.destroy();
    })
    .then(() => resolve({ id }))
    .catch((err) => {
      console.log('Error deleting', err);
      reject(err);
    }));
 
  return {
    findAll,
    create,
    update,
    deleteById,
  };
};
