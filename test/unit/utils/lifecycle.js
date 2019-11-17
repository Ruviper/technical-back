const { User } = require('../../../src/db');

const cleanDatabase = async () => {
  await User.destroy({ truncate: { cascade: true } });
};

module.exports = {
  cleanDatabase,
};
