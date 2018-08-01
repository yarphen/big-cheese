const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    about: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    pass: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  });
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.pass;
    return values;
  };
  User.findByName = function (q) {
    return User.findAll({
      where: {
        name: {
          [Op.like]: q && `${q}%`,
        },
      },
      limit: 10,
    });
  };
  return User;
};
