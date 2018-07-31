const handler = require('../utils/handler');

const getAllDeals = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

const postNewDeal = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

const postNewMsg = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

const getDeal = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  res.status(200).json({ message: 'dummy' });
};

module.exports = (app) => {
  app.get('/deals', handler(getAllDeals)); // TODO auth
  app.post('/deals', handler(postNewDeal)); // TODO auth
  app.post('/deals/:id', handler(postNewMsg)); // TODO auth
  app.get('/deals/:id', handler(getDeal)); // TODO auth
};
