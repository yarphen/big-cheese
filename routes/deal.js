const dealService = require('../services/deal');

const handler = require('../utils/handler');

const getAllDeals = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  const { userId } = req.body; // TODO auth
  const deals = await dealService.listUserDeals(userId);
  res.status(200).json(deals);
};

const postNewDeal = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  const { userId } = req.body; // TODO auth
  const dealInfo = await dealService.createNewDeal(userId, req.body);
  res.status(200).json(dealInfo);
};

const postNewMsg = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  const { userId } = req.body; // TODO auth
  const { dealId } = req.params;
  const msgInfo = await dealService.postMessage(userId, dealId, req.body);
  res.status(200).json(msgInfo);
};

const getDeal = async (req, res) => { // eslint-disable-line
  console.log(req.body);
  const { userId } = req.body; // TODO auth
  const { dealId } = req.params;
  const dealInfo = await dealService.getDeal(userId, dealId);
  res.status(200).json(dealInfo);
};

module.exports = (app) => {
  app.get('/deals', handler(getAllDeals)); // TODO auth
  app.post('/deals', handler(postNewDeal)); // TODO auth
  app.post('/deals/:id', handler(postNewMsg)); // TODO auth
  app.get('/deals/:id', handler(getDeal)); // TODO auth
};
