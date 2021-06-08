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

module.exports = {
  PizzaOrder,
  PizzaOrderTopping,
  Sauce,
  Size,
  Topping,
};
