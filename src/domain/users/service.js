const { 
  createValidator,
  updateValidator,
} = require('./validators');
const { encryptPassword } = require('../../utils/auth');

const { isAuthenticated } = require('./auth/service');

const db = require('../../db');

module.exports = () => {
  const find = async () => {
    try {
      const users = await db.User.findAll();
      return users;
    } catch (err) {
      const errMessage = `Error while finding all users, ${err.message}`
      console.error({
        code: 'users.find',
        message: errMessage,
      });
      throw new Error(errMessage);
    }
  };

  const create = async (userToBeCreated) => {
    try {
      const validation = createValidator(userToBeCreated);
      if (validation.error) {
        const errMessage =  validation.error.details[0].message;
        console.error({
          code: 'users.validation',
          message: errMessage,
        });
        throw new Error('There are missing required fields');
      }
      const user = await db.User.findOne({
        where: { userName: userToBeCreated.userName },
      });
      if (user) {
        const errMessage = 'User with this userName already exists';
        console.error( {
          code: 'user.exists',
          message: errMessage,
        });

        throw new Error(errMessage);
      }
      const hash = await encryptPassword(userToBeCreated.password);
      const newUser = await db.User.create({ ...userToBeCreated, password: hash });
      return newUser;
    } catch (err) {
      throw new Error(`Error while create user, ${err.message}`);
    }
  };

  const update = async (id, body) => {
    const validation = updateValidator(body);
    if (validation.error) {
      const errMessage =  validation.error.details[0].message;
      console.error({
        code: 'user.validation',
        message: errMessage
      });
      throw new Error(errMessage);
    }

    try {
      const updatedUser = await db.User.update(body, {
        where: { id },
        returning: true,
        plain: true,
      });
      return updatedUser[1];
    } catch (err) {
      const errMessage = `Error while updating users ${err}`;

      console.error({
        code: 'user.update',
        message: errMessage,
      });

      throw new Error(errMessage);
    }
  };

  const deleteById = async({ id }) => {
    try {
      await db.User.destroy({
        where: { id }
      });
      return { id, deleted: true };
    } catch(err) {
      const errMessage = `Error while deleting user, ${err.message}`;
      const error = {
        code: 'users.deleteById',
        message: errMessage,
      };
      throw new Error(errMessage);
    }
  };
  
 
  return {
    find,
    create,
    update,
    deleteById,
  };
};
