const dealService = require('../services/deal');

const checkDealAccess = (req, res, next) => {
  const { userId } = req.user || {};
  const paramsDealId = parseInt(req.params.dealId, 10);
  dealService.getDeal(userId, paramsDealId).then((myDeal) => {
    if (!myDeal) {
      throw new Error('Deal not found');
    }
    const { deal: { sellerId, buyerId } } = myDeal;
    if (userId !== sellerId && userId !== buyerId) {
      throw new Error('Deal not found'); // No one is allowed to know deal ID except seller and buyer
    }
    next();
  }).catch(err => next(err));
};

const checkUserAccess = (req, res, next) => {
  const { userId } = req.user || {};
  const paramsUserId = parseInt(req.params.userId, 10);
  if (paramsUserId !== userId) {
    next(new Error('Permission denied'));
  }
  next();
};

module.exports = {
  checkDealAccess,
  checkUserAccess,
};
