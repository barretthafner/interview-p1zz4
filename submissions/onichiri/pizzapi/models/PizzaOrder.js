const { DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

const PizzaOrder = sequelize.define(
  'PizzaOrder',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    sizeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Size',
        key: 'id',
      },
    },
    sauceId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Sauce',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {},
);

module.exports = { PizzaOrder };
