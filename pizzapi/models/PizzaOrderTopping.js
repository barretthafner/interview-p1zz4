const { DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

const PizzaOrderTopping = sequelize.define(
  'PizzaOrderTopping',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    pizzaOrderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'PizzaOrder',
        key: 'id',
      },
    },
    toppingId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Topping',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      set() {
        this.dataValue(sequelize.NOW);
      },
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {},
);

module.exports = { PizzaOrderTopping };
