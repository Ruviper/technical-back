const { STRING, DATE } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    userName: STRING,
    password: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });

  return User;
};
