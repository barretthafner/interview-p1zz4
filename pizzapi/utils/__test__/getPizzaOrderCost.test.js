const assert = require('assert');
const { getPizzaOrderCost } = require('../getPizzaOrderCost');

const validTest = getPizzaOrderCost({
  saucePrice: '5.00',
  sizePrice: '2.00',
  toppings: [{ price: '3.25' }, { price: '1.00' }],
});

assert.strictEqual(validTest, '11.25', 'Pizza cost should be 11.25');
assert.notStrictEqual(validTest, '11.26', 'Pizza should not cost anything but 11.25');
