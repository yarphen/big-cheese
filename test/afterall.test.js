const { sequelize } = require('../models');

after(() => sequelize.close());
