const express = require('express');
const { Topping, Size, Sauce } = require('./models');
const { PizzaOrderController } = require('./controllers/PizzaOrderController')
const { PizzaOrderToppingController } = require('./controllers/PizzaOrderToppingController')
const { ToppingController } = require('./controllers/ToppingController')



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
  app.post('/pizzaOrder/price', PizzaOrderToppingController.getPizzaOrderToppingPrice, async (_req, res) => {
    await res.status(200).json(res.locals.price);
  })
  
  /**
   * Exercise #3
   * Implement `/pizzaOrder/create` endpoint here
   */
   app.post('/pizzaOrder/create', PizzaOrderController.createPizzaOrder, PizzaOrderToppingController.createPizzaOrderTopping, PizzaOrderToppingController.getPizzaOrderToppingPrice,
    async (_req, res) => {
      await res.status(200).json(res.locals.price);
  });

  /**
   * Exercise #4
   * Implement `/customer/favoriteTopping` endpoint here
   */
   app.get('/customer/favoriteTopping', PizzaOrderController.getId, PizzaOrderToppingController.getFavoriteToppingId,ToppingController.getTopping, async (_req, res) => {
    await res.status(200).json(res.locals.favoriteTopping);
  });

  app.listen(port, () => {
    console.log(`Pizzapi listening at http://localhost:${port}`);
  });

  return app;
};

module.exports = { startApp };
