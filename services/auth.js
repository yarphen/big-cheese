const { smtp } = require('config');

const { sendMail } = require('./email');
const { models: { user } } = require('../models');
const { makeHash, makeRandomPass } = require('../utils/password');

const signup = async (newUser) => {
  const passwordHash = makeHash(newUser.password);
  const userWithSameEmail = await user.findOne({ where: { email: newUser.email } });
  if (userWithSameEmail) {
    throw new Error('User with this email already exists');
  }
  return user.create({ ...newUser, pass: passwordHash });
};

const reset = async (email) => {
  const newPass = makeRandomPass();
  const passwordHash = makeHash(newPass);
  await user.update({ pass: passwordHash }, { where: { email } });
  await sendMail({
    ...smtp,
    to: email,
    subject: 'Password reset',
    text: `Your new password is ${newPass}.`,
  });
};

const login = async (email, password) => {
  const u = await user.findOne({ where: { email, pass: makeHash(password) } });
  if (!u) {
    throw new Error('Login failed');
  }
  return u;
};

module.exports = {
  signup,
  reset,
  login,
};
