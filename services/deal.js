const { models: { deal, message }, sequelize, Sequelize: { Op } } = require('../models');
const {
  STATUS_PROGRESS,
  STATUS_ACCEPTED,
  STATUS_REJECTED,
  REJECTION_PRICE,
  SELLER_TO_BUYER,
  BUYER_TO_SELLER,
  PRICE_TRESHHOLD,
} = require('../constants');

const getDirections = (myDeal, userId) => {
  const { sellerId, buyerId } = myDeal;
  if (userId === sellerId) {
    return SELLER_TO_BUYER;
  }
  if (userId === buyerId) {
    return BUYER_TO_SELLER;
  }
  throw new Error('Permission denied'); // should not happen; should be caught before
};

const createUpdateQuery = (myPrice, partnerPrice) => {
  if (myPrice === REJECTION_PRICE) {
    return { status: STATUS_REJECTED };
  }
  if (Math.abs(myPrice - partnerPrice) < PRICE_TRESHHOLD) {
    return { status: STATUS_ACCEPTED, price: myPrice };
  }
  return { price: myPrice };
};

const listUserDeals = userId => deal.find({
  [Op.or]: [
    { where: { selledrId: userId } },
    { where: { buyerId: userId } },
  ],
});

const getDeal = async (userId, dealId) => {
  const myDeal = await deal.findById(dealId);
  if (!myDeal) {
    throw new Error('No such deal');
  }
  const { sellerId, buyerId } = myDeal;
  if (sellerId !== userId && buyerId !== userId) {
    throw new Error('This is not your deal');
  }
  return myDeal;
};

const createNewDeal = async (userId, msg) => {
  const { text, price, buyerId } = msg;
  return sequelize.transaction(async (t) => {
    if (price < 0) {
      throw new Error('Could not set negative price');
    }
    if (buyerId === userId) {
      throw new Error('You can\'t have a deal with youself');
    }
    const myDeal = await deal.create({ selledrId: userId, buyerId }, { transaction: t });
    const { dealId } = myDeal;
    const newMsg = await message.create(
      { text, price, direction: SELLER_TO_BUYER, dealId },
      { transaction: t },
    );
    return { message: newMsg, deal: myDeal };
  });
};

const postMessage = async (userId, dealId, msg) => {
  const { text, price } = msg;
  return sequelize.transaction(async (t) => {
    const myDeal = await deal.findById(dealId, { transaction: t });
    if (!myDeal) {
      throw new Error('No such deal');
    }
    const { status } = myDeal;

    if (status !== STATUS_PROGRESS) {
      throw new Error('The deal is closed');
    }

    const { direction, oppositeDirection } = getDirections(myDeal, userId);

    const partnerMsg = await message.findOne({ where: { dealId, direction: oppositeDirection }, order: [['createdAt', 'DESC']] }, { transaction: t });
    const myMsg = await message.create({ text, price, direction, dealId }, { transaction: t });

    if (!partnerMsg) {
      throw new Error('Wait for partner response');
    }

    const update = createUpdateQuery(myMsg.price, partnerMsg.price);

    await deal.update(update, { where: { dealId } }, { transaction: t });
  });
};

module.exports = {
  createNewDeal,
  postMessage,
  listUserDeals,
  getDeal,
};
