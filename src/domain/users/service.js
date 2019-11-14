module.exports = ({ db }) => {
  const findAll = async () => {
    try {
      const users = await db.User.findAll();
      return users;
    } catch (err) {
      const error = {
        code: 'users.findAll',
        message: `Error while finding all users${err}`,
      };
      throw error;
    }
  };
 
  return { findAll };
};
