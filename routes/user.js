const handler = require('../utils/handler');
const userService = require('../services/user');
const { checkUserAccess } = require('../middlewares/acl');

const findUsers = async (req, res) => { // eslint-disable-line
  const { name, email } = req.query;
  console.log(req.query);
  console.log(req.body);
  const users = await userService.findUsers(name, email);
  res.status(200).json(users);
};

const getUser = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  const user = await userService.getUser(req.params.userId);
  if (!user) {
    throw new Error('User not found');
  }
  res.status(200).json(user);
};

const updateProfile = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  const updatedUser = await userService.updateProfile(req.params.userId, req.body);
  res.status(200).json(updatedUser);
};

module.exports = (app) => {
  app.get('/users', handler(findUsers)); // TODO auth
  app.get('/users/:id', handler(getUser)); // TODO auth
  app.patch('/users/:id', checkUserAccess, handler(updateProfile)); // TODO auth
};
