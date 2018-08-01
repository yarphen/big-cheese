const { jwt: { secret } } = require('config');

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const { login } = require('./auth');
const { getUser } = require('./user');


passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, cb) => login(email, password)
      .then(user => cb(null, user)).catch(err => cb(err)),
  ),
);
passport.use(
  new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: secret },
    (jwt, cb) => getUser(jwt.userId)
      .then(user => cb(null, user.toJSON())).catch(err => cb(err)),
  ),
);
