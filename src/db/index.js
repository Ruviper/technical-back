const Sequelize = require('sequelize');

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_LOGGING_ENABLED,
  DATABASE_URL,
} = require('../config');

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_URL,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: DATABASE_LOGGING_ENABLED,
    operatorsAliases: false,
  },
);

const User = require('../domain/users/model')(sequelize);

const modelSync = [
  User.sync(),
];

const sync = async () => Promise.all(modelSync);

module.exports = {
  User,
  database: sequelize,
  sync,
};
