const { REJECTION_PRICE } = require('../constants');

const dealMessageValidate = (req, res, next) => {
  const { price } = req.body;
  if (price !== REJECTION_PRICE && price < 0) {
    next(new Error('Could not set negative price'));
  }
  next();
};

const userSearchValidate = (req, res, next) => {
  const { email, name } = req.query;
  if (!email && !name) {
    next(new Error('You should specify at least one param: name or email'));
  }
  next();
};

module.exports = { dealMessageValidate, userSearchValidate };
