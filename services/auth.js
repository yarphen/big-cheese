const { models: { user } } = require('../models');

const signup = async (newUser) => {
  const res = await user.create(newUser);
  // TODO implement email confirmation and generating password
  return res;
};

module.exports = {
  signup,
};
