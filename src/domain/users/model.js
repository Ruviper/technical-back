const { STRING } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    userName: STRING,
    password: STRING,
  });

  return User;
};
