const { REJECTION_PRICE } = require('../constants');

const dealMessageValidate = (req, res, next) => {
  const { price } = req.body;
  if (price !== REJECTION_PRICE && price < 0) {
    next(new Error('Could not set negative price'));
  }
  next();
};

module.exports = { dealMessageValidate };
