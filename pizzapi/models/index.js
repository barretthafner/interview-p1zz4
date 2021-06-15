const { PizzaOrder } = require('./PizzaOrder');
const { PizzaOrderTopping } = require('./PizzaOrderTopping');
const { Sauce } = require('./Sauce');
const { Size } = require('./Size');
const { Topping } = require('./Topping');

PizzaOrder.belongsTo(Size);
Size.hasMany(PizzaOrder);

PizzaOrder.belongsTo(Sauce);
Sauce.hasMany(PizzaOrder);

/**
 * Exercise #2
 * Implement sequelize associations for PizzaOrderTopping here
 */
PizzaOrderTopping.belongsTo(PizzaOrder, {
  foreignKey: 'pizzaOrderId',
});

PizzaOrderTopping.belongsTo(Topping, {
  foreignKey: 'toppingId',
});

Topping.belongsToMany(PizzaOrder, {
  through: 'PizzaOrderTopping',
  foreignKey: 'toppingId',
  as: { singular: 'order', plural: 'orders' },
});

PizzaOrder.belongsToMany(Topping, {
  through: 'PizzaOrderTopping',
  foreignKey: 'pizzaOrderId',
  as: { singular: 'topping', plural: 'toppings' },
});

module.exports = {
  PizzaOrder,
  PizzaOrderTopping,
  Sauce,
  Size,
  Topping,
};
