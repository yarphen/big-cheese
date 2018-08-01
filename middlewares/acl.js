const dealService = require('../services/deal');

const checkDealAccess = (req, res, next) => {
  const { userId } = req.query; // TODO AUTH
  dealService.getDeal(req.params.dealId).then((myDeal) => {
    if (!myDeal) {
      throw new Error('Deal not found');
    }
    const { sellerId, buyerId } = myDeal;
    if (userId !== sellerId && userId !== buyerId) {
      throw new Error('Deal not found'); // No one is allowed to know deal ID except seller and buyer
    }
    next();
  }).catch(err => next(err));
};

const checkUserAccess = (req, res, next) => {
  const { userId } = req.query; // TODO AUTH
  if (req.params.userId !== userId) {
    next(new Error('Permission denied'));
  }
  next();
};

module.exports = {
  checkDealAccess,
  checkUserAccess,
};
