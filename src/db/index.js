const Sequelize = require('sequelize');
const {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
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

module.exports = {
  database: sequelize,
};
