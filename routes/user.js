const handler = require('../utils/handler');

const getAllDeals = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

const getAllUsers = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
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
  app.get('/users', handler(getAllUsers)); // TODO auth
  app.get('/users/:id', handler(getUser)); // TODO auth
  app.patch('/users/:id', handler(updateProfile)); // TODO auth // TODO verify that user is the same
};
