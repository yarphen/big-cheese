const Sequelize = require('sequelize');

const { STATUS_PROGRESS } = require('../constants');

module.exports = (sequelize) => {
  const Deal = sequelize.define('Deal', {
    dealId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sellerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    buyerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: STATUS_PROGRESS,
    },
  });

  Deal.associate = (models) => {
    Deal.belongsTo(models.User, {
      foreignKey: 'buyerId',
      as: 'buyer',
    });
    Deal.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
    Deal.hasMany(models.Message, {
      foreignKey: 'dealId',
      as: 'deals',
    });
  };

  return Deal;
};
