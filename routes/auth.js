const { jwt: { secret } } = require('config');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const handler = require('../utils/handler');
const authService = require('../services/auth');

const login = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      res.status(401).json({ message: info ? info.message : 'Login failed', user });
      return;
    }
    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }
      const token = jwt.sign(user, secret);
      res.json({ user, token });
    });
  })(req, res);
};

const signup = async (req, res) => {
  const newUser = await authService.signup(req.body);
  res.status(200).json(newUser);
};

const reset = async (req, res) => {
  const { email } = req.body;
  await authService.reset(email);
  res.status(200).json({ message: 'Check your email, please' });
};

const verify = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = (app) => {
  app.post('/auth/login', handler(login));
  app.post('/auth/signup', handler(signup));
  app.post('/auth/reset', handler(reset));
  app.post('/auth/verify', passport.authenticate('jwt', { session: false }), handler(verify)); // TODO auth
};
