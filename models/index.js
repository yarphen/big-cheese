const { postgres: { db, username, password, host, port } } = require('config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(db, username, password, { dialect: 'postgres', port, host });

const user = require('./user')(sequelize);
const deal = require('./deal')(sequelize);
const message = require('./message')(sequelize);

sequelize.sync().then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.error('An error occured', err);
});

module.exports = {
  models: {
    deal,
    user,
    message,
  },
  sequelize,
  Sequelize,
};
