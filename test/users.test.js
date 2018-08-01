/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const { models: { user } } = require('../models'); // TODO replace with service testing
const authService = require('../services/auth'); // TODO replace with service testing
const userService = require('../services/user'); // TODO replace with service testing
const { makeHash } = require('../utils/password');

const mockUser1 = { name: 'Michael', pass: 'abc', email: 'blabla.example@gmail.com' };
const mockUser2 = { name: 'Agent 007', password: '123', passwordConfirm: '123', email: 'blabla@gmail.com', about: 'XXX' };


describe('Users and auth', function () {
  beforeEach(async function () {
    await user.destroy({ where: {}, truncate: true });
  });

  it('Signup and find user by name', async function () {
    const newUser = await authService.signup(mockUser1);
    const users = await userService.findUsers(mockUser1.name);
    expect(users.length, 'Should return only one user').to.be.equal(1);
    expect(users[0].email, 'Should have same email').to.be.equal(mockUser1.email);
    expect(users[0].pass, 'Should have selected pass').to.be.equal(makeHash(mockUser1.pass));
    const newUserJSON = newUser.toJSON();
    expect(newUserJSON.pass, 'Should return no password').to.not.exist;
  });

  it('Signup and find user by email', async function () {
    const newUser = await authService.signup(mockUser1);
    const users = await userService.findUsers(null, mockUser1.email);
    expect(users.length, 'Should return only one user').to.be.equal(1);
    expect(users[0].email, 'Should have same email').to.be.equal(mockUser1.email);
    expect(users[0].pass, 'Should have selected pass').to.be.equal(makeHash(mockUser1.pass));
    const newUserJSON = newUser.toJSON();
    expect(newUserJSON.pass, 'Should return no password').to.not.exist;
  });

  it('Signup and find user by id', async function () {
    const newUser = await authService.signup(mockUser1);
    const sameUser = await userService.getUser(newUser.userId);

    expect(sameUser, 'Should return an object').to.be.an('object');
    expect(sameUser.email, 'Should have same email').to.be.equal(mockUser1.email);
    expect(sameUser.pass, 'Should have selected pass').to.be.equal(makeHash(mockUser1.pass));
    const sameUserJSON = sameUser.toJSON();
    expect(sameUserJSON.pass, 'Should return no password').to.not.exist;
  });

  it('Signup and update profile', async function () {
    const newUser = await authService.signup(mockUser1);
    await userService.updateProfile(newUser.userId, mockUser2);
    const updatedUser = await userService.getUser(newUser.userId);

    expect(updatedUser, 'Should return an object').to.be.an('object');
    expect(updatedUser.email, 'Should have new email').to.be.equal(mockUser2.email);
    expect(updatedUser.name, 'Should have new name').to.be.equal(mockUser2.name);
    expect(updatedUser.about, 'Should have new about').to.be.equal(mockUser2.about);
    expect(updatedUser.pass, 'Should have new pass').to.be.equal(makeHash(mockUser2.password));

    const updatedUserJSON = updatedUser.toJSON();
    expect(updatedUserJSON.pass, 'Should return no password').to.not.exist;
  });

  it('Signup and update profile (password mismatch)', async function () {
    const newUser = await authService.signup(mockUser1);
    try {
      await userService.updateProfile(newUser.userId, { ...mockUser2, password: '1234' });
      expect(false, 'Should throw if pass mismatch').to.be.eq(true);
    } catch (e) {
      expect(true, 'Should throw if pass mismatch').to.be.eq(true);
    }

    const sameUser = await userService.getUser(newUser.userId);

    expect(sameUser, 'Should return an object').to.be.an('object');
    expect(sameUser.email, 'Should have new email').to.be.equal(mockUser1.email);
    expect(sameUser.name, 'Should have new name').to.be.equal(mockUser1.name);
    expect(sameUser.about, 'Should have same about').to.not.exist;
    expect(sameUser.pass, 'Should have same pass').to.be.equal(makeHash(mockUser1.pass));

    const sameUserJSON = sameUser.toJSON();
    expect(sameUserJSON.pass, 'Should return no password').to.not.exist;
  });


  it('Signup and update profile (empty update)', async function () {
    const newUser = await authService.signup(mockUser1);
    await userService.updateProfile(newUser.userId, { });

    const sameUser = await userService.getUser(newUser.userId);

    expect(sameUser, 'Should return an object').to.be.an('object');
    expect(sameUser.email, 'Should have new email').to.be.equal(mockUser1.email);
    expect(sameUser.name, 'Should have new name').to.be.equal(mockUser1.name);
    expect(sameUser.about, 'Should have same about').to.not.exist;
    expect(sameUser.pass, 'Should have same pass').to.be.equal(makeHash(mockUser1.pass));

    const sameUserJSON = sameUser.toJSON();
    expect(sameUserJSON.pass, 'Should return no password').to.not.exist;
  });

  it('Duplication should throw', async function () {
    await authService.signup(mockUser1);
    try {
      await authService.signup(mockUser1);
      expect(false, 'Duplication should throw error').to.be.eq(true);
    } catch (e) {
      expect(true, 'Duplication should throw error').to.be.eq(true);
    }
  });
});
