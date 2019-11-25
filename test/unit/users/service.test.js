const should = require('chai').should();
const lifecycle = require('../utils/lifecycle');

const db = require('../../../src/db');

const createUserService = require('../../../src/domain/users/service');
const usersService = createUserService({ db });

let user;
let fakeUser;

describe('users service', () => {
  beforeEach(async () => {
    fakeUser = {
      userName: 'rubenVilches',
      password: '12341234',
    };
    await lifecycle.cleanDatabase();
  });

  it('finds no users', async () => {
    const users = await usersService.find();
    await users.should.have.length(0);
  });

  it('finds one user', async () => {
    await usersService.create(fakeUser);
    const users = await usersService.find();
    users.should.have.length(1);
  });

  it('creates one user', async () => {
    let users = await usersService.find();
    users.should.have.length(0);
    await usersService.create(fakeUser);
    users = await usersService.find();
    users.should.have.length(1);
  });

  it('fails creating one user, because it has no userName', async () => {
    fakeUser.userName = undefined;
    try {
      await usersService.create(fakeUser);
      throw new Error('Validation has worked but it should not');
    } catch (err) {
      should.exist(err);
      err.message.should.equal('Error while created user, There are missing required fields');
    }
  });

  it('updates a user', async () => {
    const newInfo = {
      userName: 'OherUserName',
    };
    await usersService.create(fakeUser);
    let user = await db.User.findOne({ where: { userName: fakeUser.userName } });
    const newUser = await usersService.update(user.id, newInfo);
    user = await db.User.findOne({ where: { userName: fakeUser.userName } });
    newUser.userName.should.equal(newInfo.userName);
  });

  it('fails updating a user because it tries to modify firstName (not allowed) ', async () => {
    const newInfo = {
      firstName: 'OherUserName',
    };
    await usersService.create(fakeUser);
    user = await db.User.findOne({ where: { userName: fakeUser.userName } });
    try {
      await usersService.update(user.id, newInfo);
      throw new Error('Validation should have failed');
    } catch (err) {
      should.exist(err);
      err.message.should.equal('"firstName" is not allowed');
    }
  });

  it('deletes one user by id', async () => {
    await usersService.create(fakeUser);
    let users = await usersService.find();
    users.should.have.length(1);
    const userToDelete = users[0];
    await usersService.deleteById({ id: userToDelete.id });
    users = await usersService.find();
    users.should.have.length(0);
  });
});
