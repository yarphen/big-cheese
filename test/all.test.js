const { sequelize } = require('../models');

before(() => sequelize.sync());
after(() => sequelize.close());
