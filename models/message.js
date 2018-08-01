const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define('Message', {
    messageId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    direction: {
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
    dealId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Deal, {
      foreignKey: 'dealId',
      as: 'deal',
    });
  };

  return Message;
};
