/* eslint-disable prefer-arrow-callback */
const { expect } = require('chai');

const { models: { user } } = require('../models'); // TODO replace with service testing
const authService = require('../services/auth'); // TODO replace with service testing


describe('Users and auth', function () {
  beforeEach(async function () {
    await user.destroy({ where: {}, truncate: true });
  });

  it('Signup and find user by name', async function () {
    const newUser = await authService.signup({ name: 'Michael', pass: 'abc', email: 'blabla.example@gmail.com' });
    const users = await user.findByName('Michael');
    expect(users.length === 1, 'Should return only one user');
    expect(users[0].email === newUser.email, 'Shoul have same email');
    const newUserJSON = newUser.toJSON();
    expect(!newUserJSON.pass, 'Should return no password');
  });

  it('Duplication should throw', async function () {
    await authService.signup({ name: 'Michael', pass: 'abc', email: 'blabla.example@gmail.com' });
    try {
      await authService.signup({ name: 'Michael', pass: 'abc', email: 'blabla.example@gmail.com' });
      expect(false, 'Duplication should throw error');
    } catch (e) {
      expect(true, 'Duplication should throw error');
    }
  });
});
