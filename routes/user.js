const handler = require('../utils/handler');
const { models: { user } } = require('../models');

const findUser = async (req, res) => { // eslint-disable-line
  const { q } = req.query;
  console.log(req.query);
  console.log(req.body);
  const users = await user.findByName(q);
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
  app.get('/users', handler(findUser)); // TODO auth
  app.get('/users/:id', handler(getUser)); // TODO auth
  app.patch('/users/:id', handler(updateProfile)); // TODO auth // TODO verify that user is the same
};
