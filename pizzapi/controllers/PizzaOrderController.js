const { PizzaOrder } = require('../models');

const PizzaOrderController = {}

//Create a new entry in the pizzaOrder table
PizzaOrderController.createPizzaOrder = async (_req, res, next) => {
  const {email, size, sauce } = _req.body;
 
  const result = await PizzaOrder.create({
    email, sizeId : size, sauceId : sauce
  });

  res.locals.id = result.id;
  return await next();
}   


//Query the pizzaOrder table and get the id of the entry with a given email
PizzaOrderController.getId = async (_req, res, next) => {
  const { email } = _req.body;

  const result = await PizzaOrder.findAll( {raw: true, where: {email} ,
    attributes: ['id']});
  let pizzaOrderIds = await result.map(pizzaOrder => pizzaOrder.id);

  res.locals.pizzaOrderIds = pizzaOrderIds;
  return await next();
}  


module.exports = { PizzaOrderController };