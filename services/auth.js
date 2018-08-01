const { models: { user } } = require('../models');
const { makeHash, makeRandomPass } = require('../utils/password');

const signup = async (newUser) => {
  const passwordHash = makeHash(newUser.password);
  return user.create({ ...newUser, pass: passwordHash });
};

const reset = async (email) => {
  const newPass = makeRandomPass();
  const passwordHash = makeHash(newPass);
  await user.update({ pass: passwordHash }, { where: { email } });
  // TODO send to email
  console.log(newPass);
};

module.exports = {
  signup,
  reset,
};
