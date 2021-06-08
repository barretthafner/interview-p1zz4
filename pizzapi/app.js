const express = require('express');
const { Topping, Size, Sauce } = require('./models');

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

  /**
   * Exercise #3
   * Implement `/pizzaOrder/create` endpoint here
   */

  /**
   * Exercise #4
   * Implement `/customer/favoriteTopping` endpoint here
   */

  app.listen(port, () => {
    console.log(`Pizzapi listening at http://localhost:${port}`);
  });

  return app;
};

module.exports = { startApp };
