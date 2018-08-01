const passport = require('passport');

const dealService = require('../services/deal');

const handler = require('../utils/handler');
const { checkDealAccess } = require('../middlewares/acl');
const { dealMessageValidate } = require('../middlewares/validate');

const getAllDeals = async (req, res) => {
  const { userId } = req.user;
  const deals = await dealService.listUserDeals(userId);
  res.status(200).json(deals);
};

const postNewDeal = async (req, res) => {
  const { userId } = req.user;
  const dealInfo = await dealService.createNewDeal(userId, req.body);
  res.status(200).json(dealInfo);
};

const postNewMsg = async (req, res) => {
  const { userId } = req.user;
  const dealId = parseInt(req.params.dealId, 10);
  const msgInfo = await dealService.postMessage(userId, dealId, req.body);
  res.status(200).json(msgInfo);
};

const getDeal = async (req, res) => {
  const { userId } = req.user;
  const dealId = parseInt(req.params.dealId, 10);
  const dealInfo = await dealService.getDeal(userId, dealId);
  res.status(200).json(dealInfo);
};

module.exports = (app) => {
  app.get('/deals', passport.authenticate('jwt', { session: false }), handler(getAllDeals)); // TODO auth
  app.post('/deals', passport.authenticate('jwt', { session: false }), dealMessageValidate, handler(postNewDeal)); // TODO auth
  app.post('/deals/:dealId', passport.authenticate('jwt', { session: false }), checkDealAccess, dealMessageValidate, handler(postNewMsg)); // TODO auth
  app.get('/deals/:dealId', passport.authenticate('jwt', { session: false }), checkDealAccess, handler(getDeal)); // TODO auth
};
