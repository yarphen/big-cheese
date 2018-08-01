const { models: { user }, Sequelize: { Op } } = require('../models');
const { makeHash } = require('../utils/password');

const getUser = userId => user.findById(userId);

const findUsers = (name, email) => user.findAll({
  [Op.and]: [
    { where: { name: { [Op.like]: `${name}%` } } },
    { where: { email: { [Op.like]: `${email}%` } } },
  ],
});

const updateProfile = (userId, profileUpdate) => {
  const { name, email, about, password, passwordConfirm } = profileUpdate;
  const update = {};
  if (typeof name !== 'undefined') {
    update.name = name;
  }
  if (typeof email !== 'undefined') {
    update.email = email;
  }
  if (typeof about !== 'undefined') {
    update.about = about;
  }
  if (typeof password !== 'undefined' || typeof passwordConfirm !== 'undefined') {
    if (password !== passwordConfirm) {
      throw new Error('Passwords do not match');
    }
    update.pass = makeHash(password);
  }
  return user.update(update, { where: { userId } });
};


module.exports = {
  findUsers,
  getUser,
  updateProfile,
};
