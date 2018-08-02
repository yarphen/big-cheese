const passport = require('passport');

const handler = require('../utils/handler');
const userService = require('../services/user');
const { checkUserAccess } = require('../middlewares/acl');
const { userSearchValidate } = require('../middlewares/validate');

const findUsers = async (req, res) => {
  const { name, email } = req.query;
  const users = await userService.findUsers(name, email);
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await userService.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  res.status(200).json(user);
};

const updateProfile = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  await userService.updateProfile(userId, req.body);
  const updatedUser = await userService.getUser(userId);
  res.status(200).json(updatedUser);
};

module.exports = (app) => {
  app.get('/users', passport.authenticate('jwt', { session: false }), userSearchValidate, handler(findUsers));
  app.get('/users/:userId', passport.authenticate('jwt', { session: false }), handler(getUser));
  app.patch('/users/:userId', passport.authenticate('jwt', { session: false }), checkUserAccess, handler(updateProfile));
};
