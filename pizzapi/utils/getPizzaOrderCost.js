/**
 * Calculate pizza order cost
 * @param {Object} price Object containing sauce, size, and topping price info
 * @param {string} price.saucePrice Price of the sauce used for the pizza
 * @param {string} price.sizePrice Additional pizza price based on the pizza size
 * @param {Object[]} price.toppings Array of topping objects
 * @param {string} price.toppings[].price The price of the pizza topping
 * @returns {string} The total cost of the pizza order
 */
exports.getPizzaOrderCost = function ({ saucePrice, sizePrice, toppings }) {
  if (!saucePrice || !sizePrice || !toppings || toppings.length === 0) {
    throw new Error('Please provide prices of sauce, size, and toppings');
  }

  const pizzaSauceCost = Number(saucePrice);
  const pizzaSizeCost = Number(sizePrice);
  const pizzaToppingsCost = toppings.reduce((sum, topping) => {
    sum += Number(topping.price);
    return sum;
  }, 0);
  return (pizzaSauceCost + pizzaSizeCost + pizzaToppingsCost).toString();
};
