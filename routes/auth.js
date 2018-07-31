const handler = require('../utils/handler');

const login = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

const signup = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

const reset = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

const verify = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

module.exports = (app) => {
  app.post('/auth/login', handler(login));
  app.post('/auth/signup', handler(signup));
  app.post('/auth/reset', handler(reset));
  app.post('/auth/verify', handler(verify)); // TODO auth
};
