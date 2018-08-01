const Sequelize = require('sequelize');

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
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
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
  };

  return Deal;
};
