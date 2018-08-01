const crypto = require('crypto');

const makeHash = pass => crypto.createHash('sha512').update(pass, 'utf-8').digest().toString('hex');

const makeRandomPass = () => crypto.randomBytes(6).toString('base64');

module.exports = {
  makeHash,
  makeRandomPass,
};
