const express = require('express');
const { Op, QueryTypes } = require('sequelize');
const { check, matchedData } = require('express-validator');
const { Topping, Size, Sauce, PizzaOrder, PizzaOrderTopping } = require('./models');
const sequelize = require('./sequelize');
const { getPizzaOrderCost } = require('./utils/getPizzaOrderCost');
const { validatePizzaInput } = require('./utils/validatePizzaInput');
const { favoriteTopping } = require('./queries/favoriteTopping');
const { handleValidationErrors } = require('./middlewares/handleValidationErrors');

const startApp = (port) => {
  const app = express();
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.send("Come get it while it's hot!");
  });

  app.get('/topping', async (_req, res) => {
    res.send(await Topping.findAll());
  });

  app.get('/size', async (_req, res) => {
    res.send(await Size.findAll());
  });

  app.get('/sauce', async (_req, res) => {
    res.send(await Sauce.findAll());
  });

  /**
   * Exercise #1
   * Implement `/pizzaOrder/price` endpoint here
   */
  app.get(
    '/pizzaOrder/price',
    [...validatePizzaInput],
    handleValidationErrors,
    async (_req, res) => {
      // Omit extra fields from the request body
      const requestFields = matchedData(_req, { includeOptionals: false });

      const { size: sizeId, sauce: sauceId, toppings } = requestFields;
      try {
        const [pizzaSize, pizzaSauce, pizzaToppings] = await Promise.all([
          // Find pizza size record
          Size.findOne({ attributes: ['price'], where: { id: sizeId } }),
          // Find pizza sauce record
          Sauce.findOne({ attributes: ['price'], where: { id: sauceId } }),
          // Find all pizza topping records
          Topping.findAll({ where: { id: { [Op.in]: toppings } } }),
        ]);
        // Throw error if there were any issues finding the size, sauce, or toppings
        if (!pizzaSize) throw new Error('Pizza size id not found');
        if (!pizzaSauce) throw new Error('Pizza sauce id not found');
        if (!pizzaToppings || pizzaToppings.length !== toppings.length) {
          throw new Error('All topping ids not found');
        }
        // Calculate the total cost, convert to string
        const totalCost = getPizzaOrderCost({
          saucePrice: pizzaSauce.price,
          sizePrice: pizzaSize.price,
          toppings: pizzaToppings,
        });
        // Send total cost of the pizza
        res.json(totalCost);
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    },
  );

  /**
   * Exercise #3
   * Implement `/pizzaOrder/create` endpoint here
   */
  app.post(
    '/pizzaOrder/create',
    [
      check('email').isEmail().withMessage('Please provide a valid email address'),
      ...validatePizzaInput,
    ],
    handleValidationErrors,
    async (_req, res) => {
      // Omit extra fields from the request body
      const requestFields = matchedData(_req, { includeOptionals: false });

      try {
        // Create entry in PizzaOrder and PizzaOrderTopping tables
        const { email, size: sizeId, sauce: sauceId, toppings } = requestFields;
        // Create a new transaction, rollback if both order and topping records aren't created
        const transaction = await sequelize.transaction(async (t) => {
          // Create pizza order
          const pizzaOrder = await PizzaOrder.create(
            { email, sizeId, sauceId },
            { transaction: t },
          );
          // Create pizza order topping records
          await Promise.all(
            toppings.map(async (topping) => {
              return await PizzaOrderTopping.create(
                { pizzaOrderId: pizzaOrder.id, toppingId: topping },
                { transaction: t },
              );
            }),
          );
          return pizzaOrder;
        });

        const order = await PizzaOrder.findOne({
          where: { id: transaction.id },
          include: [
            { model: Sauce, attributes: ['price'] },
            { model: Size, attributes: ['price'] },
            { model: Topping, as: 'toppings', attributes: ['price'] },
          ],
          attributes: ['id'],
        });
        // Return error if order id isn't found
        if (!order) {
          throw new Error('Order not found');
        }
        // Calculate total order cost and send
        const totalCost = getPizzaOrderCost({
          saucePrice: order.Sauce.price,
          sizePrice: order.Size.price,
          toppings: order.toppings,
        });

        res.json(totalCost);
        // Return price, formatted as string like '32.20' for PizzaOrder
      } catch (err) {
        res.status(400).send(err);
      }
    },
  );

  /**
   * Exercise #4
   * Implement `/customer/favoriteTopping` endpoint here
   */
  app.get(
    '/customer/favoriteTopping',
    [check('email').isEmail().trim().withMessage('Please provide a valid email address')],
    handleValidationErrors,
    async (_req, res) => {
      // Omit fields not validated
      const { email } = matchedData(_req, { includeOptionals: false });

      try {
        const favorite = await sequelize.query(favoriteTopping, {
          plain: true,
          model: Topping,
          mapToModel: true,
          replacements: { email },
          type: QueryTypes.SELECT,
        });

        if (!favorite) {
          throw new Error('No records found for the provided email');
        }

        res.send(favorite);
      } catch (err) {
        res.status(400).json({ error: { message: err.message } });
      }
    },
  );

  // Test endpoint to get order details
  app.get('/pizzaOrder/:orderId', async (_req, res) => {
    const { orderId } = _req.params;

    try {
      const order = await PizzaOrder.findOne({
        where: { id: orderId },
        include: [
          { model: Sauce, attributes: ['price'] },
          { model: Size, attributes: ['price'] },
          { model: Topping, as: 'toppings', attributes: ['price'] },
        ],
        attributes: ['id'],
      });
      // Return error if order id isn't found
      if (!order) {
        throw new Error('Order not found');
      }
      // Calculate total order cost and send
      const totalCost = getPizzaOrderCost({
        saucePrice: order.Sauce.price,
        sizePrice: order.Size.price,
        toppings: order.toppings,
      });

      res.send([order, { totalCost }]);
    } catch (err) {
      res.status(400).send({ error: { message: err.message } });
    }
  });

  app.listen(port, () => {
    console.log(`Pizzapi listening at http://localhost:${port}`);
  });

  return app;
};

module.exports = { startApp };
