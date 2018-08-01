const { models: { deal, message }, sequelize } = require('../models');
const { STATUS_PROGRESS, STATUS_ACCEPTED, STATUS_REJECTED, REJECTION_PRICE, SELLER_TO_BUYER, BUYER_TO_SELLER } = require('../constants');

const createNewDeal = async (userId, msg) => {
  const { text, price, buyerId } = msg;
  await sequelize.transaction(async (t) => {
    const myDeal = await deal.create({ selledrId: userId, buyerId }, { transaction: t });
    const { dealId } = myDeal;
    await message.create({ text, price, SELLER_TO_BUYER, dealId }, { transaction: t });
  });
};

const postMessage = async (dealId, userId, msg) => {
  const { text, price } = msg;
  await sequelize.transaction(async (t) => {
    const myDeal = await deal.findById(dealId, { transaction: t });
    if (!myDeal) {
      throw new Error('No such deal');
    }
    const { sellerId, buyerId, status } = myDeal;
    if (status !== STATUS_PROGRESS) {
      throw new Error('The deal is closed');
    }
    let direction = -1;
    let oppositeDirection = -1;
    if (userId === sellerId) {
      direction = SELLER_TO_BUYER;
      oppositeDirection = BUYER_TO_SELLER;
    }
    if (userId === buyerId) {
      direction = BUYER_TO_SELLER;
      oppositeDirection = SELLER_TO_BUYER;
    }
    if (direction === -1) {
      throw new Error('This is not your deal');
    }

    const partnerMsg = await message.findOne({ where: { dealId, direction: oppositeDirection }, order: [['createdAt', 'DESC']] }, { transaction: t });
    const myMsg = await message.create({ text, price, direction, dealId }, { transaction: t });

    let update = null;

    if (myMsg.price === REJECTION_PRICE) {
      update = { status: STATUS_REJECTED };
    } else if (myMsg.price === partnerMsg.price) {
      update = { status: STATUS_ACCEPTED, price };
    } else {
      update = { price };
    }

    await deal.update(update, { where: { dealId } });
  });
};

module.exports = {
  createNewDeal,
  postMessage,
};
