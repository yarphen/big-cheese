const handler = require('../utils/handler');
const userService = require('../services/user');
const { checkUserAccess } = require('../middlewares/acl');

const findUsers = async (req, res) => { // eslint-disable-line
  const { q, email } = req.query;
  console.log(req.query);
  console.log(req.body);
  const users = await userService.findUsers(q, email);
  res.status(200).json(users);
};

const getUser = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

const updateProfile = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

module.exports = (app) => {
  app.get('/users', handler(findUsers)); // TODO auth
  app.get('/users/:id', handler(getUser)); // TODO auth
  app.patch('/users/:id', checkUserAccess, handler(updateProfile)); // TODO auth // TODO verify that user is the same
};
