const auth = require('./auth');
const deal = require('./deal');
const user = require('./user');

module.exports = (app) => {
  auth(app);
  deal(app);
  user(app);
};
