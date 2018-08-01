/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const { models: { user, deal, message } } = require('../models'); // TODO replace with service testing
const authService = require('../services/auth'); // TODO replace with service testing
const dealService = require('../services/deal'); // TODO replace with service testing

const { STATUS_ACCEPTED, STATUS_PROGRESS, STATUS_REJECTED, REJECTION_PRICE } = require('../constants');

const user1 = { name: 'Michael', password: 'abc', email: 'user1@gmail.com' };
const user2 = { name: 'Michael', password: 'abc', email: 'user2@gmail.com' };
const user3 = { name: 'Michael', password: 'abc', email: 'user3@gmail.com' };

const shouldThrow = async (promise, msg) => {
  let error = false;
  try {
    await promise;
  } catch (e) {
    error = true;
  }
  expect(error, msg).to.be.eq(true);
};

describe('Deals and messages', function () {
  before(async function () {
    await user.destroy({ where: {}, truncate: true });
    // hack to know up-to-date IDS
    user1.userId = (await authService.signup(user1)).userId;
    user2.userId = (await authService.signup(user2)).userId;
    user3.userId = (await authService.signup(user3)).userId;
  });
  beforeEach(async function () {
    await deal.destroy({ where: {}, truncate: true });
    await message.destroy({ where: {}, truncate: true });
  });

  it('Deal and message are creating with new offer', async function () {
    const { deal: myDeal, message: myMsg } = await dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs', price: 1000 });
    const {
      deal: checkDeal,
      messages: [checkMessage] = [],
    } = await dealService.getDeal(user1.userId, myDeal.dealId);
    await dealService.getDeal(user2.userId, myDeal.dealId);
    const [deal2] = await dealService.listUserDeals(user1.userId);
    expect(checkDeal, 'Should have valid deal').to.exist;
    expect(checkMessage, 'Should have valid message').to.exist;
    expect(checkDeal.price, 'Should have same price').to.be.eq(1000);
    expect(checkDeal.status, 'Should have initial status').to.be.eq(STATUS_PROGRESS);
    expect(checkDeal.dealId, 'Should have same id').to.be.eq(deal2.dealId);
    expect(checkMessage.text, 'Should have same text').to.be.eq('Hello! I have some drugs');
    expect(checkMessage.price, 'Should have same price').to.be.eq(1000);
    expect(checkMessage.messageId, 'Should have same id').to.be.eq(myMsg.messageId);
  });


  it('Buyer should wait for partner', async function () {
    const { deal: myDeal } = await dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs', price: 1000 });
    await shouldThrow(
      dealService.postMessage(user1.userId, myDeal.dealId, { text: 'Discount price!', price: 100 }),
      'Should throw if buyer sends second message without response',
    );
  });

  it('Deal is closed if same price has been sent [1]', async function () {
    const { deal: myDeal } = await dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs', price: 1000 });
    await dealService.postMessage(user2.userId, myDeal.dealId, { text: 'Nice price!', price: 1000 });
    const { deal: updatedDeal } = await dealService.getDeal(user1.userId, myDeal.dealId);
    expect(updatedDeal.status, 'Status should be closed/accepted').to.be.eq(STATUS_ACCEPTED);
  });

  it('Deal is closed if same price has been sent [2]', async function () {
    const { deal: myDeal } = await dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs', price: 1000 });
    await dealService.postMessage(user2.userId, myDeal.dealId, { text: 'Nope!', price: 100 });
    await dealService.postMessage(user1.userId, myDeal.dealId, { text: 'Oh, you have a gun!', price: 100 });
    const { deal: updatedDeal } = await dealService.getDeal(user1.userId, myDeal.dealId);
    expect(updatedDeal.status, 'Status should be closed/accepted').to.be.eq(STATUS_ACCEPTED);
  });

  it('Deal is closed if -1 has been sent [1]', async function () {
    const { deal: myDeal } = await dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs', price: 1000 });
    await dealService.postMessage(user2.userId, myDeal.dealId, { text: 'Nope!', price: 100 });
    await dealService.postMessage(user2.userId, myDeal.dealId, { text: 'Nope!', price: REJECTION_PRICE });
    const { deal: updatedDeal } = await dealService.getDeal(user1.userId, myDeal.dealId);
    expect(updatedDeal.status, 'Status should be closed/rejected').to.be.eq(STATUS_REJECTED);
  });

  it('Deal is closed if -1 has been sent [2]', async function () {
    const { deal: myDeal } = await dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs', price: 1000 });
    await dealService.postMessage(user2.userId, myDeal.dealId, { text: 'Nope!', price: 100 });
    await dealService.postMessage(user1.userId, myDeal.dealId, { text: 'Nope!', price: REJECTION_PRICE });
    const { deal: updatedDeal } = await dealService.getDeal(user1.userId, myDeal.dealId);
    expect(updatedDeal.status, 'Status should be closed/rejected').to.be.eq(STATUS_REJECTED);
  });

  it('If deal is closed no messages is allowed', async function () {
    const { deal: myDeal } = await dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs', price: 1000 });
    await dealService.postMessage(user2.userId, myDeal.dealId, { text: 'Nope!', price: REJECTION_PRICE });
    let error = false;
    try {
      await dealService.postMessage(user1.userId, myDeal.dealId, { text: 'Discount price!', price: 100 });
    } catch (e) {
      error = true;
    }
    expect(error, 'Should throw if someone sends message after reject').to.be.eq(true);

    error = false;
    try {
      await dealService.postMessage(user2.userId, myDeal.dealId, { text: 'Discount price!', price: 100 });
    } catch (e) {
      error = true;
    }
    expect(error, 'Should throw if someone sends message after reject').to.be.eq(true);
  });

  it('Should throw if ...', async function () {
    await shouldThrow(
      dealService.createNewDeal(user1.userId, { buyerId: user1.userId, text: 'Hello! I have some drugs', price: 1000 }),
      'Should throw if someone sends message to himself',
    );

    await shouldThrow(
      dealService.createNewDeal(user1.userId, { buyerId: -1, text: 'Hello! I have some drugs', price: 1000 }),
      'Should throw if someone sends message to nobody',
    );
    await shouldThrow(
      dealService.postMessage(user1.userId, -1, { text: 'Hello! I have some drugs', price: 1000 }),
      'Should throw if someone sends message to non-exising deal',
    );
    await shouldThrow(
      dealService.getDeal(user1.userId, -1),
      'Should throw if someone sends message to non-exising deal',
    );

    const { deal: myDeal } = await dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs', price: 1000 });

    await shouldThrow(
      dealService.getDeal(user3.userId, myDeal.dealId),
      'Should throw if someone tries access not his deal',
    );
    await shouldThrow(
      dealService.postMessage(user3.userId, { text: 'Nice!', price: 1000 }),
      'Should throw if someone tries access not his deal',
    );
    await shouldThrow(
      dealService.createNewDeal(user1.userId, { buyerId: user2.userId, text: 'Hello! I have some drugs. I even will pay you!', price: -1000 }),
      'Should throw if someone tries set negative price (not -1)',
    );
  });
});
