const uuidv1 = require('uuid/v1');
const db = require('../../../src/db');

const registerUser = async ({ email }) => {
  await db.User.create({
    email: email || 'invent@invent.com',
    firstName: 'invent',
    lastName: 'invent',
    firebaseUid: uuidv1(),
  });
  const createdUser = await db.User.findOne({ email: email || 'invent@invent.com' });
  return createdUser;
};

module.exports = {
  registerUser,
};
